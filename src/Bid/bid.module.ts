import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidRepository } from './bid.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BidRepository]),
    AuthModule,PaymentModule
  ],
  providers: [BidService,PaymentService],
  controllers: [BidController]
})
export class BidModule {}
