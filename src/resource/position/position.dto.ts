import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    district: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    committee: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    location: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    town: string
}