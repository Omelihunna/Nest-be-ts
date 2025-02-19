import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from './services/session/session.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './services/auth/auth.module';
import { AuthController } from './services/auth/auth.controller';
import { SessionService } from './services/session/session.service';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Filmfusion-test', ),
    SessionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }), 
    SessionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}