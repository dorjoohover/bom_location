import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type DistrictDocument = Discrict & Document

@Schema({timestamps: true})
export class Discrict {
    @Prop({required: true})
    name: string

    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Zones'})
    // zone_id: string
    
    @Prop()
    zipcode: number

    @Prop()
    latitude: number

    @Prop()
    longtitude: number
    
}

export const DiscrictSchema = SchemaFactory.createForClass(Discrict)
