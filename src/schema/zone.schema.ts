import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type ZoneDocument = Zone & Document

@Schema({timestamps: true})
export class Zone {
    
    @Prop({required: true})
    name: string


}

export const ZoneSchema = SchemaFactory.createForClass(Zone)