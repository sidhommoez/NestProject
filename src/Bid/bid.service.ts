import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './bid.entity';
import { BidRepository } from './bid.repository';
import { BidDto } from './dto/bid.dto';
import { User } from 'src/auth/user.entity';
import { PaymentService, LineItem } from 'src/payment/payment.service';
import { PaymentDto } from './dto/payment.dto';
import { getRepository, createQueryBuilder } from 'typeorm';
const coffeeTypes = ['café1', 'café3', 'café4', 'café5', 'café6', 'café7', 'café8', 'café9']

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidRepository: BidRepository, private readonly paymentWithStripe: PaymentService
  ) { }

  async createService(
    bidDto: BidDto, user: User
  ): Promise<Bid> {
    return this.bidRepository.createBid(bidDto, user)
  }

  getBids(): Promise<Bid[]> {
    return this.bidRepository.getAllBids()
  }

  async getBidById(
    id: string
  ): Promise<Bid> {
    const result = await this.bidRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException(`Bid with ID "${id}" not found`);
    }
    return result;
  }

  async updateBid(
    id: string,
    bidDto: BidDto
  ): Promise<Bid> {
    const { Price } = bidDto;
    const searchForBid = await this.getBidById(id);
    Object.assign(searchForBid, { Price });
    await searchForBid.save();
    return searchForBid;
  }

  async deleteTBidById(
    id: string,
  ): Promise<void> {
    const result = await this.bidRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Bid with ID "${id}" not found`);
    }
  }

  private async getLineItems(paymentDTO:PaymentDto): Promise<Array<LineItem>> {
    const payment =[ {
      name: 'BidManagement',
      amount: Math.ceil((Math.random()*1000)%1000),
      currency: paymentDTO.currency,
      quantity: 1
    }]
    return payment
  }

  async getCheckoutSessionId(paymentDTO: PaymentDto) {
    const items = await this.getLineItems(paymentDTO)
    const { id } = await this.paymentWithStripe.createCheckoutSession(items);
    return { id };
  }


  async checkTheBidWinner(id: String) {
    const winner= createQueryBuilder("Bid");
    winner.select("Bid.id,Bid.userId,MAX(Bid.Price)", "max");
    winner.where("Bid.serviceId=:id",{id:id})
    winner.groupBy("Bid.id,Bid.userId")
    return winner.getRawOne();
  }
}