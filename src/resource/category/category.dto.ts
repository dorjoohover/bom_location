import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
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
    @ApiProperty({type: CreateFilterDto})
    filters: CreateFilterDto[]

    @IsArray()
    @ApiProperty({type: CreateAdTypeDto})
    types: CreateAdTypeDto[]
}



