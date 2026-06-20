// @ts-nocheck
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private prisma: PrismaClient;

  constructor(private config: ConfigService) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      console.warn('STRIPE_SECRET_KEY not set — payment endpoints will fail');
    }
    this.stripe = new Stripe(secretKey || 'sk_test_placeholder', {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createPaymentIntent(appointmentId: string, userId: string) {
    // Get appointment with therapist profile for pricing
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        TherapistProfile: true,
        ClientProfile: { include: { User: true } },
      },
    });

    if (!appointment) throw new NotFoundException('Appointment not found');
    if (appointment.status === 'CANCELLED') throw new BadRequestException('Cannot pay for cancelled appointment');

    // Check if payment already exists
    const existingPayment = await this.prisma.payment.findUnique({
      where: { appointmentId },
    });
    if (existingPayment && existingPayment.status === 'SUCCEEDED') {
      throw new BadRequestException('Payment already completed for this appointment');
    }

    // Calculate amount (therapist hourly rate * duration in hours)
    const hourlyRate = appointment.TherapistProfile?.hourlyRate || 50; // Default $50/hr
    const durationHours = (appointment.duration || 60) / 60;
    const amount = Math.round(hourlyRate * durationHours * 100); // Stripe uses cents

    // Create or update Stripe PaymentIntent
    let paymentIntent: Stripe.PaymentIntent;
    if (existingPayment?.stripePaymentIntentId) {
      paymentIntent = await this.stripe.paymentIntents.update(
        existingPayment.stripePaymentIntentId,
        { amount, metadata: { appointmentId, userId } },
      );
    } else {
      paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        metadata: { appointmentId, userId },
        automatic_payment_methods: { enabled: true },
      });
    }

    // Upsert payment record
    await this.prisma.payment.upsert({
      where: { appointmentId },
      create: {
        id: crypto.randomUUID(),
        appointmentId,
        userId,
        amount: amount / 100,
        currency: 'usd',
        status: 'PENDING',
        stripePaymentIntentId: paymentIntent.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        amount: amount / 100,
        stripePaymentIntentId: paymentIntent.id,
        status: 'PENDING',
        updatedAt: new Date(),
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount / 100,
      currency: 'usd',
    };
  }

  async confirmPayment(paymentIntentId: string) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    const appointmentId = paymentIntent.metadata.appointmentId;

    const statusMap: Record<string, string> = {
      succeeded: 'SUCCEEDED',
      processing: 'PENDING',
      requires_payment_method: 'FAILED',
      canceled: 'FAILED',
    };

    await this.prisma.payment.update({
      where: { appointmentId },
      data: {
        status: statusMap[paymentIntent.status] || 'PENDING',
        updatedAt: new Date(),
      },
    });

    return { status: paymentIntent.status, amount: paymentIntent.amount / 100 };
  }

  async handleWebhook(payload: string, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new BadRequestException('Webhook secret not configured');

    const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        const appointmentId = pi.metadata.appointmentId;
        await this.prisma.payment.update({
          where: { appointmentId },
          data: { status: 'SUCCEEDED', updatedAt: new Date() },
        });
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        const appointmentId = pi.metadata.appointmentId;
        await this.prisma.payment.update({
          where: { appointmentId },
          data: { status: 'FAILED', updatedAt: new Date() },
        });
        break;
      }
    }

    return { received: true };
  }

  async getPaymentStatus(appointmentId: string) {
    const payment = await this.prisma.payment.findUnique({ where: { appointmentId } });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async refundPayment(appointmentId: string, amount?: number) {
    const payment = await this.prisma.payment.findUnique({ where: { appointmentId } });
    if (!payment) throw new NotFoundException('Payment not found');
    if (payment.status !== 'SUCCEEDED') throw new BadRequestException('Payment not eligible for refund');

    const refundParams: Stripe.RefundCreateParams = {
      payment_intent: payment.stripePaymentIntentId!,
    };
    if (amount) refundParams.amount = Math.round(amount * 100);

    const refund = await this.stripe.refunds.create(refundParams);

    await this.prisma.payment.update({
      where: { appointmentId },
      data: {
        status: amount && amount < payment.amount ? 'PARTIALLY_REFUNDED' : 'REFUNDED',
        stripeRefundId: refund.id,
        refundAmount: amount || payment.amount,
        updatedAt: new Date(),
      },
    });

    return refund;
  }
}
