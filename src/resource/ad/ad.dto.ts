import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateAdDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title:string
    
    @IsString()
    @ApiProperty()
    description:string
    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    positions: []

    @IsString()
    @ApiProperty()
    location:string

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    types: []


    @IsNotEmpty()
    @ApiProperty({isArray: true})
    @IsArray()
    filters: [{
        id: string,
        value: string
    }]

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    subCategory: string

}