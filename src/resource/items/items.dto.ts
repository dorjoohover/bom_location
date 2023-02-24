import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from 'class-validator';
import { ItemType, ItemTypes } from "src/config/enum";
export class ItemDetailDto {
  @ApiProperty()
  id: string
  
  @ApiProperty()
  value: string
  
  @ApiProperty()
  parentId: string

  @ApiProperty()
  parent: string
  
}

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({isArray: true, type: ItemDetailDto})
  @IsArray()
  value: ItemDetailDto[]

  @ApiProperty({enum: ItemTypes, default: ItemTypes.dropdown})
  types: ItemTypes

  @ApiProperty({enum: ItemType, })
  type: ItemType

  @ApiProperty()
  parentId: string

  @ApiProperty()
  input: string
}