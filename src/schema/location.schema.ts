import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Committee } from "./committee.schema";

export type LocationDocument = Location & Document

export class Location {
    @Prop({required: true})
    name: string

    @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'Committees'})
    committee_id: Committee

    @Prop({required: true})
    latitude: number

    @Prop({required: true})
    longitude: number
}

export const LocationSchema = SchemaFactory.createForClass(Location)