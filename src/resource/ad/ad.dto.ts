import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AdStatus, AdTypes } from "src/config/enum";
import { enumToArray } from "src/typeformat";
import { CategorySuggestionTypes } from "../category/interface/categoryEnum";





export class AdLocation {
    @ApiProperty()
    lng: string
    @ApiProperty()
    lat: string
}

export class CreateFilterDto {
    @IsString()
    @ApiProperty()
    value: string
    @IsArray()
    @ApiProperty({isArray: true})
    values: []
    

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
}
export class FilterDto {
    

    @IsString()
    @ApiProperty()
    value: string
    
    @IsNumber()
    @ApiProperty()
    maxValue: number
    
    @IsString()
    @ApiProperty()
    name: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string
}
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

    @ApiProperty()
    location_id:string
    @IsString()

    @ApiProperty({type: CreateFilterDto, })
    town: CreateFilterDto
    

}
export class CreateAdDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title:string
    
    @IsString()
    @ApiProperty()
    description:string
    
    @IsNotEmpty()
    @ApiProperty()
    positions: string

    @ApiProperty()
    location: string

    
    @ApiProperty({enum: AdTypes, default: AdTypes.default})
    adTypes: AdTypes

    @ApiProperty({enum: AdStatus, default: AdStatus.pending})
    adStatus: AdStatus

    @ApiProperty()
    filters: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    subCategory: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    category: string

    @ApiProperty({isArray: true})
    types: string[]


    // @ApiProperty({isArray: true})
    // images: string

}

export class FilterAdDto {
    
    @IsArray()
    @IsNotEmpty() 
    @ApiProperty({isArray: true, type: FilterDto})
    filters: FilterDto[]

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({isArray: true, })
    adTypes: []

    @IsString()
    @ApiProperty()
    subCategory: string
    @IsNotEmpty()
    @ApiProperty()
    positions: AdPosition

}

export class SuggestionDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    suggestion: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({enum: enumToArray(CategorySuggestionTypes), example: 'position'})
    type: keyof typeof CategorySuggestionTypes


}