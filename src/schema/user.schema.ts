import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { UserStatus, UserType } from "src/config/enum";
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

    @Prop({ type: String, enum: UserType, default: UserType.default })
    userType: UserType;
  

    @Prop({required: true})
    email: string

    @Prop()
    password: string

    @Prop({required: true, default: 0})
    point: number

    @Prop()
    bookmarks: number[]

    @Prop({required: true, default: false})
    isAdmin: boolean

    @Prop()
    code: string

    @Prop({ type: String, enum: UserStatus, default: UserStatus.pending })
    status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User)