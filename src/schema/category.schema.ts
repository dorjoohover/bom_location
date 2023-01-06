import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { CategorySuggestionTypes } from "src/resource/category/interface/categoryEnum"
import { enumToArray } from "src/typeformat"
import { AdType } from "./ad_type.schema"
import { Discrict } from "./district.schema"
import { Filter } from "./filter.schema"
import { Location } from "./location.schema"

export type CategoryDocument = Document & Category 
@Schema({timestamps: true})
export class Category {
    @Prop({required: true})
    name: string

    @Prop({default: false})
    isParent: boolean


    @Prop({type: mongoose.Schema.Types.Array, ref: 'filters'})
    filters: string[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'filters'})
    createFilters: string[]

    @Prop({type: mongoose.Schema.Types.Array, ref: 'filters'})
    viewFilters: string[]

    @Prop({type: mongoose.Schema.Types.Array, })
    types: AdType[]

    @Prop()
    suggessionType: string[]
    @Prop()
    subCategory: string[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'locations'})
    location: Location

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Discricts'})
    discrict: Discrict
    @Prop()
    href: string
}
export const CategorySchema = SchemaFactory.createForClass(Category)
