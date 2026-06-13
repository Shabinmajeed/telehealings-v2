import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { configModuleOptions } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TherapistsModule } from './modules/therapists/therapists.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ContentModule } from './modules/content/content.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    TerminusModule,
    AuthModule,
    UsersModule,
    TherapistsModule,
    SessionsModule,
    PaymentsModule,
    ContentModule,
    MessagesModule,
    NotificationsModule,
    AnalyticsModule,
    HealthModule,
  ],
})
export class AppModule {}
