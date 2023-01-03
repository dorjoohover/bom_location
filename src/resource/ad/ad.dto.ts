import { ApiProperty } from "@nestjs/swagger";
import { IsArray,  IsEnum,  isNotEmpty,  IsNotEmpty, IsNumber, IsString } from "class-validator";
import {AdType, AdTypes } from "src/config/enum";
import { enumToArray } from "src/typeformat";
import {  CategorySuggestionTypes } from "../category/interface/categoryEnum";



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

export class CreateFilterDto {
    @IsNumber()
    @ApiProperty()
    value: number
    @IsArray()
    @ApiProperty({isArray: true})
    values: []
    

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
}
export class FilterDto {
    

    @IsNumber()
    @ApiProperty()
    value: number
    
    @IsNumber()
    @ApiProperty()
    maxValue: number
    
    @IsNumber()
    @ApiProperty()
    minValue: number
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string
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
    @ApiProperty({type: AdPosition,})
    positions: AdPosition

    @IsString()
    @ApiProperty()
    location:string

    @ApiProperty({
        isArray: true,

    })

    @IsArray()

    types?: string[];

    
    @ApiProperty({enum: AdTypes, default: AdTypes.default})
    @IsEnum(AdTypes)
    adTypes: AdTypes


    @ApiProperty({isArray: true, type: CreateFilterDto, })
    filters: CreateFilterDto[]

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    subCategory: string


    @ApiProperty({ type: 'string', format: 'binary'})
    background: any

    @ApiProperty({ type: 'string', format: 'binary',isArray: true })
    avatar: any


}

export class FilterAdDto {
    
    @IsArray()
    @IsNotEmpty() 
    @ApiProperty({isArray: true, type: FilterDto})
    filters: FilterDto[]
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