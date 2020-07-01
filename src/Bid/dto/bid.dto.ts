import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from "src/service-type/service-type.entity";

export class BidDto {
    @ApiProperty()
    @IsNotEmpty()
    Price: number;
    
    @ApiProperty()
    @IsNotEmpty() 
    service:ServiceType
}