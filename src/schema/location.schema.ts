import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Committee } from "./committee.schema";
import { Discrict } from './district.schema'
export type LocationDocument = Location & Document

@Schema()
export class Location {
    @Prop({required: true})
    name: string

    @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'Discricts'})
    district_id: string

    @Prop()
    zipcode: number

    @Prop()
    latitude: number

    @Prop()
    longitude: number
}

export const LocationSchema = SchemaFactory.createForClass(Location)