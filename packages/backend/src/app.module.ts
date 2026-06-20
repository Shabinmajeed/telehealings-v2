import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestModule } from './guest/guest.module';
import { TherapistModule } from './therapist/therapist.module';
import { UserModule } from './user/user.module';
import { MedicalProfileModule } from './medical-profile/medical-profile.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    GuestModule,
    TherapistModule,
    UserModule,
    MedicalProfileModule,
    BookingModule,
    PaymentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
