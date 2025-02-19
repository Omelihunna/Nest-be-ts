import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { SessionService } from '../session/session.service';
import { User, UserDocument } from 'src/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    constructor(
        private readonly sessionService: SessionService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers['authorization'];
            if (!authorization) {
                throw new UnauthorizedException('Authorization token not present');
            }

            const token = authorization.split(' ')[1] || authorization.split(' ')[0];
            const decoded = await this.jwtService.verifyAsync(token);

            if (!decoded) {
                throw new UnauthorizedException('Invalid token');
            }

            const session = await this.sessionService.getSessionById(decoded.id);
            if (!session || !session.user) {
                throw new UnauthorizedException('User session not found');
            }

            const user = await this.userModel.findById(session.user);
            if (!user) {
                throw new UnauthorizedException('User account not found');
            }

            if (session.expired || session.validity_end_date && session.validity_end_date <= Date.now()) {
                await this.sessionService.invalidateSession(session._id);
                throw new UnauthorizedException('Expired token');
            }

            res.locals.user = user;
            res.locals.session = session;
            next();
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
