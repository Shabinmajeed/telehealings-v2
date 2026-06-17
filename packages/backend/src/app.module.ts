import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestModule } from './guest/guest.module';
import { TherapistModule } from './therapist/therapist.module';
import { UserModule } from './user/user.module';
import { MedicalProfileModule } from './medical-profile/medical-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GuestModule,
    TherapistModule,
    UserModule,
    MedicalProfileModule,
  ],
})
export class AppModule {}
