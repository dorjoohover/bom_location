import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { AdStatus, AdTypes, CategorySuggestionTypes } from "src/config/enum";
import { enumToArray } from "src/typeformat";


export class AdLocation {
    @ApiProperty()
    lng: string
    @ApiProperty()
    lat: string
}

export class CreateFilterDto {
    @IsString()
    @ApiProperty()
    input: string


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
}
export class FilterDto {
    

    @IsString()
    @ApiProperty()
    input: string
    
    @ApiProperty()
    max: string
    
    @IsString()
    @ApiProperty()
    name: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    type: string
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