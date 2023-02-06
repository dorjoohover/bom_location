import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { CreateAdSteps } from "src/config/enum"

export type CategoryDocument = Document & Category 
@Schema({timestamps: true})
export class Category {
    @Prop({required: true})
    name: string

    @Prop()
    english: string

    @Prop({default: false})
    isParent: boolean


    @Prop({type: mongoose.Schema.Types.Array,})
    filters: string[]

    @Prop({type: mongoose.Schema.Types.Array, })
    steps: [{
        step: CreateAdSteps,
        values: []
    }]

    @Prop({type: mongoose.Schema.Types.Array, })
    viewFilters: string[]


    @Prop()
    suggessionType: string[]
    @Prop()
    subCategory: string[]

    @Prop()
    href: string
}
export const CategorySchema = SchemaFactory.createForClass(Category)
