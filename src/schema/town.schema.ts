import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Location } from "./location.schema";

export type TownDocument = Document & Town

@Schema()
export class Town {
    @Prop({required: true})
    name: string

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Locations'})
    locations: Location
}

export const TownSchema = SchemaFactory.createForClass(Town)