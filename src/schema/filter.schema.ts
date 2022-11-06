import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Type } from "./type.schema";

export type FilterDocument = Document & Filter

@Schema({timestamps: true})
export class Filter {
    @Prop({required: true})
    name: string

    @Prop()
    choices: [{
        id: number,
        value: string,
        other: boolean
    }]
    @Prop({required: true, type: mongoose.Schema.Types.String, ref: 'Types'})
    type: string

    @Prop()
    value: string
}
export const FilterSchema = SchemaFactory.createForClass(Filter)

