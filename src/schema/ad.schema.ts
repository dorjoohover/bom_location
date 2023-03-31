import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AdStatus, AdTypes } from 'src/config/enum';
import { Category } from './category.schema';
import { User } from './user.schema';

export type AdDocument = Document & Ad;

export class AdLocation {
  
  @Prop()
  lat: string;
  @Prop()
  lng: string;
}
@Schema({ timestamps: true })
export class Ad {

  @Prop({default: 1})
  num: number
  @Prop({ required: true , max_length: 100})
  title: string;

  @Prop()
  images: [];

  @Prop({max_length: 1000})
  description: string;

  @Prop()
  location: AdLocation

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  subCategory: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  category: Category;

  @Prop()
  types: []

  @Prop()
  filters: [
    {
      input: string;
      type: string
      name: string;
      max?: string
    },
  ];


  @Prop({ type: String, enum: AdTypes, default: AdTypes.default })
  adType: AdTypes;

  @Prop({ type: String, enum: AdStatus, default: AdStatus.pending })
  adStatus: AdStatus;

  @Prop()
  image: string;

  @Prop()
  file?: string

  @Prop({default: true})
  isView: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user: User;

  @Prop({type: mongoose.Schema.Types.Array, ref: 'users'})
  views?: User[]
  
  @Prop({max_length: 1000})
  returnMessage?: string
}

export const AdSchema = SchemaFactory.createForClass(Ad);
AdSchema.index({title: 'text', tags: 'text'})
