import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { CreateFilterDto } from "../filter/filter.dto";
import {CreateAdTypeDto} from '../adtype/ad_type.dto'


export class createCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    parentId: string

    @IsArray()
    @ApiProperty({isArray: true, type:CreateFilterDto})
    filters: CreateFilterDto[]

    @IsArray()
    @ApiProperty({isArray: true, type: CreateFilterDto})
    viewFilters: CreateFilterDto[]

    @IsArray()
    @ApiProperty({isArray: true, type: CreateFilterDto})
    createFilters: CreateFilterDto[]

    @IsArray()
    @ApiProperty({type: CreateAdTypeDto})
    types: CreateAdTypeDto[]

    @IsBoolean()
    @ApiProperty()
    subCategory: boolean

    @IsString()
    @ApiProperty()
    district: string

    @IsString()
    @ApiProperty()
    location: string
}



