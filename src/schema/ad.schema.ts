import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AdStatus, AdTypes } from 'src/config/enum';
import { AdType } from './ad_type.schema';
import { Category } from './category.schema';
import { Committee } from './committee.schema';
import { Discrict } from './district.schema';
import { Filter } from './filter.schema';
import { Location } from './location.schema';
import { Position } from './position.schema';
import { Town } from './town.schema';
import { User } from './user.schema';

export type AdDocument = Document & Ad;

export class AdPosition {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Discricts' })
  district_id: Discrict;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Committees' })
  committee_id: Committee;
  @Prop()
  location_id: string;
  @Prop()
  town_id: string;
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
  location: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  subCategory: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  category: Category;

  @Prop()
  filters: [
    {
      value: number;

      values: [];

      name: string;
    },
  ];

  @Prop()
  types: string[];

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
