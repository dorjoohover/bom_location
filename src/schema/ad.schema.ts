import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { AdType } from "./ad_type.schema";
import { Category } from "./category.schema";
import { Filter } from "./filter.schema";
import { Position } from "./position.schema";

export type AdDocument = Document & Ad

@Schema({timestamps: true})
export class Ad {
    @Prop({required: true})
    title: string

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'positions'})
    positions: Position[]

    @Prop()
    images: []

    @Prop()
    description: string

    @Prop()
    location: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "categories"})
    subCategory: Category

    @Prop()
    filters: [{
        id: Filter,
        value: string
    }]
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'adtypes'})
    types: AdType[]
}

export const AdSchema = SchemaFactory.createForClass(Ad)