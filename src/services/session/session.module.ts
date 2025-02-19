import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from './session.service';
import { SessionSchema, Session } from 'src/models/session.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
    controllers: [],
    providers: [SessionService],
    exports: [SessionService],
})
export class SessionModule { }
