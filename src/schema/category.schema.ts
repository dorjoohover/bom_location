import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { AdType } from "./ad_type.schema"
import { Filter } from "./filter.schema"

export type CategoryDocument = Document & Category 
@Schema({timestamps: true})
export class Category {
    @Prop({required: true})
    name: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'categories'})
    parentId: Category


    @Prop({type: mongoose.Schema.Types.Array, ref: 'filters'})
    filters: Filter[]

    @Prop({type: mongoose.Schema.Types.Array, })
    types: AdType[]
}
export const CategorySchema = SchemaFactory.createForClass(Category)
