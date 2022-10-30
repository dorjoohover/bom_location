import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

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
    @ApiProperty()
    filters: []

    @IsArray()
    @ApiProperty()
    types: []
}

