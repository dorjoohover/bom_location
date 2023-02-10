import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CreateAdSteps } from "src/config/enum";
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
        required: true,
      
    })
    @IsArray()
    steps: [{
        step: CreateAdSteps,
        values: []
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
        enum: Filters,
    })

    filters?: Filters[];
    @ApiProperty({
        isArray: true,
        required: false,
        enum: Filters,
    })

    @ApiProperty({isArray: true})
    steps: []
    viewFilters?: Filters[];
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



