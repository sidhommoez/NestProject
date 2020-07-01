import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ServiceTypeDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(36)
    @IsNotEmpty()
    name: string;
    
}