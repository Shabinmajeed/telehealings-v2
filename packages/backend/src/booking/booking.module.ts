import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
  imports: [AuthModule],
  controllers: [BookingController],
  providers: [BookingService, JwtAuthGuard],
})
export class BookingModule {}
