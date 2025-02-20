import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from './session.service';
import { SessionSchema, Session } from 'src/models/session.model';
import { SessionController } from './session.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
    controllers: [SessionController],
    providers: [SessionService],
    exports: [SessionService],
})
export class SessionModule { }
