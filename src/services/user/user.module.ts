import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema, Session } from 'src/models/session.model';
import { User, UserSchema } from 'src/models/user.model';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [],
    providers: [UserService],
    exports: [UserService],
})
export class SessionModule { }
