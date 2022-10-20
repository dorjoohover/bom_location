import {IsNotEmpty, IsString, IsNumber} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class CommitteeDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    discrict_id: string
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    zipcode: string
}