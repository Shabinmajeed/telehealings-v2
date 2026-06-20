import { Controller, Post, Get, Body, Headers, Req, RawBodyRequest } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create payment intent for an appointment' })
  @Post('intent')
  async createIntent(@Body() body: { appointmentId: string; userId: string }) {
    return this.paymentService.createPaymentIntent(body.appointmentId, body.userId);
  }

  @ApiOperation({ summary: 'Confirm payment status' })
  @Post('confirm')
  async confirm(@Body() body: { paymentIntentId: string }) {
    return this.paymentService.confirmPayment(body.paymentIntentId);
  }

  @ApiOperation({ summary: 'Get payment status for an appointment' })
  @Get('status/:appointmentId')
  async getStatus(@Body() body: { appointmentId: string }) {
    return this.paymentService.getPaymentStatus(body.appointmentId);
  }

  @ApiOperation({ summary: 'Refund a payment' })
  @Post('refund')
  async refund(@Body() body: { appointmentId: string; amount?: number }) {
    return this.paymentService.refundPayment(body.appointmentId, body.amount);
  }

  @ApiOperation({ summary: 'Stripe webhook handler' })
  @Post('webhook')
  async webhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const payload = req.rawBody?.toString() || '';
    return this.paymentService.handleWebhook(payload, signature);
  }
}
