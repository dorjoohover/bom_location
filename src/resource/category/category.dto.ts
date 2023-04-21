import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
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

    @ApiProperty({default: false})
    isParent: boolean

    @ApiProperty({isArray: true})
    steps?: CategoryStepsDto[]

    @ApiProperty({isArray: true})
    @IsArray()
    suggestionItem: string[]
    
    @ApiProperty({isArray: true}) 
    subCategory: string[]

    @ApiProperty()
    @IsString()
    href: string
}



