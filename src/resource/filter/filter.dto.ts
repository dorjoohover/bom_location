
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class Choices {
    @ApiProperty()
    id: string
    
    @ApiProperty()
    value: string

    @ApiProperty({default: false})
    other: boolean
}
export class CreateFilterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsArray()
  @ApiProperty({ isArray: true, type: Choices })
  // @IsNotEmpty()
  choices: Choices[]

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  type: string

  @IsString()
  @ApiProperty()
  value: string
}

export class UpdateFilterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsArray()
  @ApiProperty({ isArray: true, type: Choices })
  // @IsNotEmpty()
  choices: Choices[]

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  type: string

  @IsString()
  @IsNotEmpty()
  id: string
}


