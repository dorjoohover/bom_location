import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AdStatus, AdTypes } from 'src/config/enum';
import { Category } from './category.schema';
import { Committee } from './committee.schema';
import { Discrict } from './district.schema';
import { User } from './user.schema';

export type AdDocument = Document & Ad;
export class AdTown {
  
  @Prop()
  value: number;

  @Prop()
    values: [];
  @Prop()
    name: string;
}
export class AdPosition {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Discricts' })
  district_id: Discrict;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Committees' })
  committee_id: Committee;
  @Prop()
  location_id: string;
  @Prop()
  town: AdTown
}

export class AdLocation {
  
  @Prop()
  lat: string;
  @Prop()
  lng: string;
}
@Schema({ timestamps: true })
export class Ad {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  positions: AdPosition;

  @Prop()
  images: [];

  @Prop()
  description: string;

  @Prop()
  location: AdLocation

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  subCategory: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  category: Category;

  @Prop()
  filters: [
    {
      value: string;

      values: [];

      name: string;
    },
  ];


  @Prop({ type: String, enum: AdTypes, default: AdTypes.default })
  adType: AdTypes;

  @Prop({ type: String, enum: AdStatus, default: AdStatus.pending })
  adStatus: AdStatus;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user: User;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
