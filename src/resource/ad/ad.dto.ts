import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";



export class AdPosition {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    district_id: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    committee_id: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    town_id:string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    location_id:string

}
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
    @ApiProperty({type: AdPosition})
    positions: AdPosition

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

