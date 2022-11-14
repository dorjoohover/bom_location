import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { AdType } from "./ad_type.schema"
import { Discrict } from "./district.schema"
import { Filter } from "./filter.schema"
import { Location } from "./location.schema"

export type CategoryDocument = Document & Category 
@Schema({timestamps: true})
export class Category {
    @Prop({required: true})
    name: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'categories'})
    parentId: Category


    @Prop({type: mongoose.Schema.Types.Array, ref: 'filters'})
    filters: Filter[]

    @Prop({type: mongoose.Schema.Types.Array, ref: 'filters'})
    createFilters: Filter[]

    @Prop({type: mongoose.Schema.Types.Array, ref: 'filters'})
    viewFilters: Filter[]

    @Prop({type: mongoose.Schema.Types.Array, })
    types: AdType[]

    @Prop()
    subCategory: boolean

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'locations'})
    location: Location

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Discricts'})
    discrict: Discrict
    
}
export const CategorySchema = SchemaFactory.createForClass(Category)
