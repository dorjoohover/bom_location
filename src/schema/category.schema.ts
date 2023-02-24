import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { CreateAdSteps } from "src/config/enum"
import { Item } from "./items.schema"

export type CategoryDocument = Document & Category 
export class CategorySteps {
    @Prop({ type: String, enum: CreateAdSteps})
    step: CreateAdSteps

    @Prop({ type: mongoose.Schema.Types.Array, ref: 'items' })
    values: Item[]
}

@Schema({timestamps: true})
export class Category {
    @Prop({required: true})
    name: string

    @Prop()
    english: string

    @Prop({default: false})
    isParent: boolean


    @Prop({type: mongoose.Schema.Types.Array, })
    steps: CategorySteps[]

    @Prop({ type: mongoose.Schema.Types.Array, ref: 'items' })
    filters: Item[]


    @Prop()
    suggessionType: string[]
    @Prop()
    subCategory: string[]

    @Prop()
    href: string
}
export const CategorySchema = SchemaFactory.createForClass(Category)


// {
//     "id": "63f212d2742b202a77c109d5",
//     "name": "Орон сууц",
//     "filters": ["63ea6cfbe32ee2f685fa89e1", "63ea6d5ae32ee2f685fa89e7", "63ea6d22e32ee2f685fa89e4", "63ea6b5be32ee2f685fa89db", "63ea6c53e32ee2f685fa89de", "63f85b87d45bf86ab6e15078", "63f85d77d45bf86ab6e1507f", "63f85d81d45bf86ab6e15082", "63ea6fcae32ee2f685fa8a00", "63ea6f77e32ee2f685fa89fc"],
//     "steps": [
//       {
//   "step": "location",
//   "values": [
//    "63ea4866e32ee2f685fa89d3","63ea5d33e32ee2f685fa89d8","63f85caad45bf86ab6e1507c"
//   ]},
//   {
//   "step": "general",
//   "values": [
//    "63f85d77d45bf86ab6e1507f", "63f85d81d45bf86ab6e15082", "63f85d92d45bf86ab6e15085"
//   ]},
//   {
//   "step": "detail",
//   "values": [
//    "63ea6cfbe32ee2f685fa89e1", "63ea6d5ae32ee2f685fa89e7", "63ea6d22e32ee2f685fa89e4", "63ea6b5be32ee2f685fa89db", "63ea6c53e32ee2f685fa89de", "63f85b87d45bf86ab6e15078", "63ea6e3de32ee2f685fa89f0", "63ea6dbbe32ee2f685fa89ea", "63ea6ea8e32ee2f685fa89f3", "63ea6de5e32ee2f685fa89ed", "63ea6f2de32ee2f685fa89f6", "63ea6f69e32ee2f685fa89f9",  "63ea6fcae32ee2f685fa8a00", "63ea6f77e32ee2f685fa89fc"
//   ]}
//     ],
//     "suggestionType": [
//       "room", "location"
//     ],
//     "isParent": false,
//     "href": "apartment",
//     "english": "Apartment"
//   }