import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type FilterDocument = Document & Filter

@Schema({timestamps: true})
export class Filter {
    @Prop({required: true})
    name: string

    @Prop()
    choices: []
}
export const FilterSchema = SchemaFactory.createForClass(Filter)