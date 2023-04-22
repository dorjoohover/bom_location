import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, ValidateIf } from "class-validator";
import { CreateAdSteps } from "src/config/enum";

export class CategoryStepsDto {
    @ApiProperty({  enum: CreateAdSteps})
    step: CreateAdSteps

    @ApiProperty({ isArray: true })
    values: string[]
}
export class CategoryDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    english: string

    @ApiProperty()
    @ValidateIf((object, value) => value !== null)
    parent: string | null

    @ApiProperty({isArray: true})
    steps?: CategoryStepsDto[]

    @ApiProperty({isArray: true})
    @IsArray()
    suggestionItem: string[]

    @ApiProperty()
    @IsString()
    href: string
}



