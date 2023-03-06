import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Socials, UserStatus, UserType } from "src/config/enum";

export type UserDocument = Document & User


export class Social {
    @Prop()
    url: string
    @Prop({type: String, enum: Socials})
    name: Socials

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
    code: string

    @Prop({ type: String, enum: UserStatus, default: UserStatus.pending })
    status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User)