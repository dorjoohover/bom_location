import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateFilterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsArray()
    @ApiProperty()
    @IsNotEmpty()
   
    choices: []
}