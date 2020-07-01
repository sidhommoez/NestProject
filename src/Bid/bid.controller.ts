import { Controller, Logger, Get, ParseIntPipe, Delete, Param, Post, UsePipes, ValidationPipe, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BidService } from './bid.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Bid } from './bid.entity';
import { BidDto } from './dto/bid.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaymentDto } from './dto/payment.dto';

@ApiTags('BID')
@Controller('bid')
@UseGuards(AuthGuard())
export class BidController {
    constructor(private bidService: BidService) { }

    @Get()
    @ApiBearerAuth("access-token")
    getBidType(
        @GetUser() user: User
    ): Promise<Bid[]> {
        return this.bidService.getBids();
    }

    @Post('/session')
    @ApiBearerAuth("access-token")
    getCheckoutSession(
        @Body() paymentDto:PaymentDto,){
        return this.bidService.getCheckoutSessionId(paymentDto);
    }

    @Get('/:id')
    @ApiBearerAuth("access-token")
    getBidById(
        @Param('id', ParseIntPipe) id: string,
    ): Promise<Bid> {
        return this.bidService.getBidById(id);
    }

    @Post('/winner/:id')
    @ApiBearerAuth("access-token")
    getthewinnerOftheBid(
        @Param('id') id: string,
    ): Promise<Bid> {
        return this.bidService.checkTheBidWinner(id);
    }

    @Delete('/:id')
    @ApiBearerAuth("access-token")
    deleteBidById(
        @Param('id', ParseIntPipe) id: string,
    ): Promise<void> {
        return this.bidService.deleteTBidById(id);
    }

    @Post()
    @ApiBearerAuth("access-token")
    @UsePipes(ValidationPipe)
    createBid(
        @Body() bidDto:BidDto, @GetUser() user:User
    ): Promise<Bid> {
        return this.bidService.createService(bidDto,user);
    }

}