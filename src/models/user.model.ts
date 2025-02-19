import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
    @Prop({ required: false, trim: true, index: true })
    walletId: string;

    @Prop({ required: true, trim: true, index: true })
    email: string;

    @Prop({ required: true, trim: true })
    password: string;

    @Prop({ required: true, trim: true })
    username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);