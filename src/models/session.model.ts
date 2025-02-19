import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { SESSION_STATUS } from 'src/common/AppConstants';
import { User } from './user.model';

export type SessionDocument = HydratedDocument<Session>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Session {
    @Prop({ required: true, trim: true, index: true })
    uuid: string;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId;

    @Prop({ type: String, enum: Object.values(SESSION_STATUS), default: SESSION_STATUS.ACTIVE })
    status: string;

    @Prop()
    validity_end_date?: number;

    @Prop({ default: false })
    logged_out: boolean;

    @Prop({ default: false })
    expired: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);