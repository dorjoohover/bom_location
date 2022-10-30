import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTownDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    location: string

}