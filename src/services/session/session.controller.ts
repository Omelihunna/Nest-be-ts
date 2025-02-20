import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { RegisterDto } from 'src/dto/requests/auth/register.dto';
import { LoginDto } from 'src/dto/requests/auth/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { CreateSessionDto } from 'src/dto/requests/session/create-session.dto';
import { v4 as uuidV4 } from 'uuid';

@ApiTags('Session')
@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    @ApiOperation({ summary: 'Create a custom session' })
    @ApiResponse({ status: 201, description: 'Session created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post('create')
    async testSession (@Body() sessionDto: CreateSessionDto) {
        return this.sessionService.createSession({...sessionDto, uuid: uuidV4()});
    }
}