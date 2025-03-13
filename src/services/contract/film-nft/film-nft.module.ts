import { Module } from "@nestjs/common";
import { FilmRightsController } from "./film-nft.controller";
import { FilmRightsService } from "./film-nft.service";
import { BlockchainConfigService } from "src/config/config.service";

@Module({
    imports: [],
    controllers: [FilmRightsController],
    providers: [FilmRightsService, BlockchainConfigService],
})

export class FilmNftModule { }