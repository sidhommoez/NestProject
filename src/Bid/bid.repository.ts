import { EntityRepository, Repository, getRepository, MoreThan } from 'typeorm';
import {Bid} from './bid.entity';
import { BidDto } from './dto/bid.dto';
import { BadRequestException } from '@nestjs/common';
import { Service } from 'src/service/service.entity';
import { User } from 'src/auth/user.entity';

@EntityRepository(Bid)
export class BidRepository extends Repository<Bid> {

  async createBid(bidDto:BidDto,user:User
  ): Promise<Bid> {
    const bid = new Bid();
    const serviceId =String(bidDto.service)
    Object.assign(bid, { ...bidDto,user });
    const checkPrice = await getRepository(Service).findOne({id:serviceId})
    const checkOtherBids = await getRepository(Bid).findOne({where:{Price: MoreThan(bidDto.Price)}})
    if (checkPrice.startingPrice >= bid.Price || checkOtherBids)
    {
      throw new BadRequestException(`you must bid with a higher price`)
    }else {
    await bid.save();
    return bid;
  }}

  async getAllBids(
    ): Promise<Bid[]> {
      return this.find();
    }
}
