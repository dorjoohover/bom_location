import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AdTypeDocument = Document & AdType

@Schema()
export class AdType {
    @Prop({required: true})
    name: string
}   

export const AdTypeSchema = SchemaFactory.createForClass(AdType)