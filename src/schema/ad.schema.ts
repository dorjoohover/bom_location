import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { AdType } from "./ad_type.schema";
import { Category } from "./category.schema";
import { Committee } from "./committee.schema";
import { Discrict } from "./district.schema";
import { Filter } from "./filter.schema";
import { Location } from "./location.schema";
import { Position } from "./position.schema";
import { Town } from "./town.schema";

export type AdDocument = Document & Ad

export class AdPosition {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Discricts'})
    district_id: Discrict
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Committees'})
    committee_id: Committee
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Locations'})
    location_id: Location
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Towns'})
        town_id: Town
}
@Schema({timestamps: true})

export class Ad {
    @Prop({required: true})
    title: string

    @Prop({required: true, })
    positions: AdPosition

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