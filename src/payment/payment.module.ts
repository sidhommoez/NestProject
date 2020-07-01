import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService],
  controllers: []
})
export class PaymentModule {}
