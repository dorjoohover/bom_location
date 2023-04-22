import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator';
import { ItemPosition, ItemTypes } from "src/config/enum";

export class ItemDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNumber()
  index: number

  @ApiProperty({  enum: ItemTypes})
  type: ItemTypes

  @ApiProperty()
  parentId?: string
    
  @ApiProperty({  enum: ItemPosition, default: ItemPosition.default})
  position: ItemPosition;

  @ApiProperty()
  other: boolean

  @ApiProperty({default: false})
  isSearch: boolean

  @ApiProperty({default: true})
  isUse: boolean
}
