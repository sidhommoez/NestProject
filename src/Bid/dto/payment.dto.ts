import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class PaymentDto {
    @ApiProperty()
    @IsNotEmpty()
    amount: number;
    
    @ApiProperty()
    @IsNotEmpty() 
    @IsString()
    currency:string
}