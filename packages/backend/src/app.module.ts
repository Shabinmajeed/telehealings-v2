import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestModule } from './guest/guest.module';
import { TherapistModule } from './therapist/therapist.module';
import { UserModule } from './user/user.module';
import { MedicalProfileModule } from './medical-profile/medical-profile.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    GuestModule,
    TherapistModule,
    UserModule,
    MedicalProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
