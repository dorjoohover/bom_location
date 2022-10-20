import {IsString, IsNotEmpty, IsNumber} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
export class LocationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    committee_id: string
    

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    lantitude: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    longitude: string

}