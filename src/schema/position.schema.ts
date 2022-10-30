import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Committee } from "./committee.schema";
import { Discrict } from "./district.schema";
import { Location } from "./location.schema";
import { Town } from "./town.schema";

export type PositionDocument = Document & Position

@Schema({timestamps: true})
export class Position {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Discricts'})
    district: Discrict

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Committees'})
    committee: Committee
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Locations'})
    location: Location
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Towns'})
    towns: Town
}

export const PositionSchema = SchemaFactory.createForClass(Position)