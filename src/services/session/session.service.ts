import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SESSION_STATUS } from 'src/common/AppConstants';
import { CreateSessionDto } from 'src/dto/requests/session/create-session.dto';
import { UpdateSessionDto } from 'src/dto/requests/session/update-session.dto';
import { SessionDocument, Session } from 'src/models/session.model';

@Injectable()
export class SessionService {
    constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {
    }

    async createSession(dto: CreateSessionDto): Promise<SessionDocument> {
        const { durationInHours, ...rest} = dto
        const newSession = await this.sessionModel.create({...rest, validity_end_date: new Date().getTime() + 1000 * 60 * 60 * (durationInHours || 24)})
        // console.log(newSession);
        return newSession;
    }

    async getSessionByUserId(userId: Types.ObjectId): Promise<SessionDocument | null> {
        const session = await this.sessionModel.findOne({user: userId});
        return session;
    }

    async getSessionById(sessionId: string): Promise<SessionDocument> {
        const session = await this.sessionModel.findById(sessionId);
        if (!session) throw new NotFoundException('Session not found');
        return session;
    }

    async updateSession(sessionId: Types.ObjectId, dto: UpdateSessionDto): Promise<SessionDocument> {
        const session = await this.sessionModel.findByIdAndUpdate(sessionId, {...dto, validity_end_date: new Date().getTime() + 1000 * 60 * 60 * 24});
        if (!session) throw new NotFoundException('Session not found');
        return session;
    }

    async invalidateSession(sessionId: Types.ObjectId): Promise<SessionDocument> {
        return this.updateSession(sessionId, { status: SESSION_STATUS.EXPIRED, logged_out: true });
    }
}
