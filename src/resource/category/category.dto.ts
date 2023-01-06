import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateFilterDto } from "../filter/filter.dto";
import {CreateAdTypeDto} from '../adtype/ad_type.dto'
import { Transform } from "class-transformer";
import { CategorySuggestionTypes, Filters } from "./interface/categoryEnum";


export class CreateSubCategory {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @ApiProperty({
        isArray: true,
        required: false,
        enum: Filters,
    })
    @IsEnum(Filters, {each: true})
    @IsArray()

    filters?: Filters[];
    @ApiProperty({
        isArray: true,
        required: false,
        enum: Filters,
    })
    @IsEnum(Filters, {each: true})
    @IsArray()

    viewFilters?: Filters[];
    @ApiProperty({
        isArray: true,
        required: false,
        enum: CategorySuggestionTypes,
    })
    @IsEnum(CategorySuggestionTypes, {each: true})
    @IsArray()

    suggestionType?: CategorySuggestionTypes[];
    
    @IsBoolean()
    @ApiProperty({default: false})
    isParent: boolean

    @IsString()
    @ApiProperty()
    href: string

}

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @ApiProperty({
        isArray: true,
        required: false,
        enum: Filters,
    })
    @IsEnum(Filters, {each: true})
    @IsArray()

    filters?: Filters[];
    @ApiProperty({
        isArray: true,
        required: false,
        enum: Filters,
    })
    @IsEnum(Filters, {each: true})
    @IsArray()

    viewFilters?: Filters[];
    @ApiProperty({
        isArray: true,
        required: false,
        enum: CategorySuggestionTypes,
    })
    @IsEnum(CategorySuggestionTypes, {each: true})
    @IsArray()

    suggestionType?: CategorySuggestionTypes[];
    
    @IsBoolean()
    @ApiProperty({default: false})
    isParent: boolean

    @IsString()
    @ApiProperty()
    href: string
}
export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsBoolean()
    @ApiProperty({default: true})
    isParent: boolean

    @IsString()
    @ApiProperty()
    href: string

}



