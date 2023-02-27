import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ItemType, ItemTypes } from "src/config/enum";

export type ItemDocument = Item & Document

export class ItemDetail {
  @Prop()
  id: string
  
  @Prop()
  value: string


  @Prop()
  parentId?: string

  @Prop({ type: String, enum: ItemTypes })
  parent?: ItemTypes

}

@Schema()
export class Item {
    @Prop({required: true})
    name: string
  
    @Prop()
    value: ItemDetail[]

    @Prop({ type: String, enum: ItemTypes, required: true})
    types: ItemTypes

    @Prop({ type: String, enum: ItemType, required: true })
    type: ItemType

    @Prop()
    parentId?: string
    
    @Prop()
    input?: string
    @Prop()
    max?: string
}

export const ItemSchema = SchemaFactory.createForClass(Item)