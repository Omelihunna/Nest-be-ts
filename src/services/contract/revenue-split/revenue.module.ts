import { Module } from "@nestjs/common";
import { RevenueSplitController } from "./revenue.controller";
import { RevenueSplitService } from "./revenue.service";
import { BlockchainConfigService } from "src/config/config.service";

@Module({
    imports: [],
    controllers: [RevenueSplitController],
    providers: [RevenueSplitService, BlockchainConfigService],
})

export class RevenueSplitModule { }