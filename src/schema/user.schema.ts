import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { PointSendType, Socials, UserStatus, UserType } from "src/config/enum";

export type UserDocument = Document & User


export class Social {
    @Prop()
    url: string
    @Prop({type: String, enum: Socials})
    name: Socials

}
export class PointHistory {
    @Prop()
    point: number

    @Prop({type: mongoose.Types.ObjectId, ref: 'users'})
    sender: string
    
    @Prop({type: mongoose.Types.ObjectId, ref: 'users'})
    receiver: string

    @Prop({ type: String, enum: PointSendType,  })
    type: PointSendType;

}
@Schema({timestamps: true})
export class User  {
    @Prop()
    username: string

    @Prop()
    profileImg?: string

    @Prop()
    ads: string[]

    @Prop()
    phone: string

    @Prop({ type: String, enum: UserType, default: UserType.default })
    userType: UserType;
    
    @Prop()
socials: Social[]

    @Prop({required: true})
    email: string

    @Prop()
    password: string

    @Prop({required: true, default: 0})
    point: number

    @Prop()
    birthday?: string
    @Prop()
    bookmarks: number[]

    
    @Prop()
    pointHistory : PointHistory[]
    @Prop()
    code: string

    @Prop({ type: String, enum: UserStatus, default: UserStatus.pending })
    status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User)