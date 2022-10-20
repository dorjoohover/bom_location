import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type LocationDocument = Location & Document

export class Location {
    @Prop({required: true})
    name: string

    @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'Committees'})
    committee_id: string

    @Prop({required: true})
    latitude: number

    @Prop({required: true})
    longitude: number
}

export const LocationSchema = SchemaFactory.createForClass(Location)