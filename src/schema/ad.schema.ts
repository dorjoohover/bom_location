import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type adDocument = Document & Ad

@Schema({timestamps: true})
export class Ad {
    @Prop({required: true})
    title: string
}

export const AdSchema = SchemaFactory.createForClass(Ad)