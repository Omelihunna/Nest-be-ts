import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from './services/session/session.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './services/auth/auth.module';
import { AuthController } from './services/auth/auth.controller'
// import { AuthService } from './services/auth/auth.service';
import { FilmNftModule } from './services/contract/film-nft/film-nft.module';
import { InvestmentModule } from './services/contract/investment/investment.module';
import { LicensingModule } from './services/contract/licensing/licensing.module';
import { RevenueSplitModule } from './services/contract/revenue-split/revenue.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Filmfusion-test', ),
    SessionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }), 
    FilmNftModule,
    InvestmentModule,
    LicensingModule,
    RevenueSplitModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}