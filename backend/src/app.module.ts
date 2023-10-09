import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from 'typeorm.config';
import { UserModule } from './user/user.module';
import { CruiseShipModule } from './cruise-ship/cruise-ship.module';
import { SuiteModule } from './suite/suite.module';
import { StaffModule } from './staff/staff.module';
import { DestinationModule } from './destination/destination.module';
import { BoatModule } from './boat/boat.module';
import { JetSkiModule } from './jet-ski/jet-ski.module';
import { RentingModule } from './renting/renting.module';
import { CruiseModule } from './cruise/cruise.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    CruiseShipModule,
    SuiteModule,
    StaffModule,
    DestinationModule,
    BoatModule,
    JetSkiModule,
    RentingModule,
    CruiseModule,
    ReservationModule,
    AuthModule,
  MailerModule.forRoot({
    transport: {
      host: '',
      port: '',
      auth: {
        user: '',
        pass: '',
      },
    },
  }),
  ],
  controllers: [AppController, EmailController],
  providers: [
    AppService,
    EmailService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
