import { ApiProperty } from '@nestjs/swagger'
import {IsNotEmpty, IsString, IsNumber} from 'class-validator'

export class DiscrictDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name:string
    
    // @IsNotEmpty()
    // @IsString()
    // @ApiProperty()
    // zone_id:string
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    zipcode:string
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    @ApiProperty()
    latitude:string
    
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    longitude:string
    
}