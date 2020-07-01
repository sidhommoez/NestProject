import { IsString, MinLength, MaxLength, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from "src/service-type/service-type.entity";

export class ServiceDto {
    @ApiProperty()
    @MinLength(3)
    @MaxLength(32)
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @MaxLength(240)
    @IsString()
    @IsNotEmpty()    
    description: string;

    @ApiProperty()
    @IsNotEmpty() 
    @IsNumber()
    startingPrice: number;

    @ApiProperty()
    @IsNotEmpty() 
    serviceType:ServiceType
}