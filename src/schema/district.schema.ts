import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type DistrictDocument = Discrict & Document

@Schema({timestamps: true})
export class Discrict {
    @Prop({required: true})
    name: string

    @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Zones'})
    zone_id: string
    
    @Prop({required: true})
    zipcode: number

    @Prop({required: true})
    latitude: number

    @Prop({required: true})
    longtitude: number
    
}

export const DiscrictSchema = SchemaFactory.createForClass(Discrict)
