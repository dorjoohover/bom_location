import {IsString, IsNotEmpty, IsNumber} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
export class LocationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
    

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    district_id: string
    

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    zipcode: number
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    lantitude: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    longitude: string

}