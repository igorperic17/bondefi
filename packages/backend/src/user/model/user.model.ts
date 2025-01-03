import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

export type MinimalUser = { id: string } & Partial<User>;
export class User extends TimeStamps implements MinimalUser, Base {
  _id!: Types.ObjectId;

  @prop({ required: true, index: true, unique: true })
  id!: string;

  @prop({ required: true, index: true, unique: true, lowercase: true })
  walletAddress?: string;

  @prop()
  languageCode?: string;
}
