import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionSchema, Session } from 'src/models/session.model';
import { User, UserSchema } from 'src/models/user.model';
import { SessionService } from '../session/session.service';
import { SessionModule } from '../session/session.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        // MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
        JwtModule.register({ secret: 'your_secret_key' }),
        SessionModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}