import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type CommitteeDocument = Committee & Document

@Schema({timestamps: true})
export class Committee {
    @Prop({required: true})
    name:string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Districts", required: true})
    district_id: string
    
    @Prop({required: true})
    zipcode: number
}

export const CommitteeSchema = SchemaFactory.createForClass(Committee)