import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BidModule } from './Bid/bid.module';
import { ServiceModule } from './service/service.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    BidModule,
    ServiceModule,
    ServiceTypeModule,
    PaymentModule

  ],
})
export class AppModule {}
