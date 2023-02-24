import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CategorySuggestionTypes, CreateAdSteps, ItemType } from "src/config/enum";


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
        
    })
    @IsArray()

    filters?: string[];


    @ApiProperty({
        isArray: true,
        required: true,
      
    })
    @IsArray()
    steps: [{
        step: CreateAdSteps,
        values: string[]
    }];
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
    @IsString()
    @ApiProperty()
    english: string

}

export class UpdateCategoryDto {
    

    @ApiProperty()
    name: string

    @ApiProperty()
    english: string

    @ApiProperty({
        isArray: true,
        required: false,
        enum: ItemType,
    })

    filters?: ItemType[];
    @ApiProperty({
        isArray: true,
        required: false,
        enum: ItemType,
    })

    @ApiProperty({isArray: true})
    steps: []
    @ApiProperty({
        isArray: true,
        required: false,
        enum: CategorySuggestionTypes,
    })


    @ApiProperty()
    suggestionType?: CategorySuggestionTypes[];

    @ApiProperty()
    isParent: boolean

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
    english: string
    @IsString()
    @ApiProperty()
    href: string

}



