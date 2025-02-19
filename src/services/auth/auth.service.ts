import { ForbiddenException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/models/user.model';
import { RegisterDto } from 'src/dto/requests/auth/register.dto';
import { SessionDocument, Session } from 'src/models/session.model';
import { LoginDto } from 'src/dto/requests/auth/login.dto';
import { SessionService } from '../session/session.service';
import { SESSION_STATUS } from 'src/common/AppConstants';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private sessionService: SessionService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.userModel.create({
            email: registerDto.email,
            username: registerDto.username,
            password: hashedPassword,
        });
        const session = await this.sessionService.createSession({ uuid: uuidV4(), user: user?._id });
        const token = await this.jwtService.signAsync({ id: session.uuid });
        return {
            code: HttpStatus.CREATED,
            message: 'User registered successfully',
            token
        };
    }

    private async verifyUser(email: string, password: string): Promise<UserDocument | null> {
        try {
            const foundUser = await this.userModel.findOne({ email });
            if (!foundUser) {
                throw new ForbiddenException({
                    code: HttpStatus.FORBIDDEN,
                    message: "User does not exist",
                    data: false,
                });
            }

            if (!foundUser.password) {
                throw new Error("Password Missing");
            }

            const isValidPassword = bcrypt.compareSync(password, foundUser.password);

            if (!isValidPassword) {
                throw new ForbiddenException({
                    code: HttpStatus.FORBIDDEN,
                    message: "Invalid Username or password.",
                    data: false,
                });
            }

            return foundUser;
        } catch (error) {
            throw error;
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.verifyUser(loginDto.email, loginDto.password);
        console.log(user)
        if (user) {
            const existingSession = await this.sessionService.getSessionByUserId(user._id);
            console.log(existingSession)
            let session: SessionDocument
            if (existingSession) {
                session = await this.sessionService.updateSession(existingSession._id, {
                    status: SESSION_STATUS.ACTIVE,
                    logged_out: false,
                    expired: false
                });
            } else {
                session = await this.sessionService.createSession({ uuid: uuidV4(), user: user._id });
            }
            const token = await this.jwtService.signAsync({ id: session.uuid });
            return {
                code: HttpStatus.OK,
                message: 'User logged in successfully',
                token
            };
        }
    }
}