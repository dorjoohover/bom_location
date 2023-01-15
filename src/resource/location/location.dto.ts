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
    

    @ApiProperty()
    zipcode: number
    
    @ApiProperty()
    lantitude: string

    @ApiProperty()
    longitude: string

}