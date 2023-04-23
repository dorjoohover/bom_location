import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ItemPosition, ItemTypes } from 'src/config/enum';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  index: number;

  @Prop({ type: String, enum: ItemTypes, required: true })
  types: ItemTypes;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'items' })
  parentId?: Item;

  @Prop({ type: String, enum: ItemPosition, default: ItemPosition.default })
  position: ItemPosition;

  @Prop()
  other: boolean;

  @Prop({ default: false })
  isSearch: boolean;

  @Prop({ default: true })
  isUse: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
