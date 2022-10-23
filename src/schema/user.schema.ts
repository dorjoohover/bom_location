import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Ad } from "./ad.schema";

export type UserDocument = Document & User

@Schema({timestamps: true})
export class User  {
    @Prop({required: true})
    username: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ad'}]})
    ads: Ad[]

    @Prop({required: true})
    phone: string

    @Prop({required: true})
    email: string

    @Prop()
    profileImg: string
}

export const UserSchema = SchemaFactory.createForClass(User)