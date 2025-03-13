import { Module } from "@nestjs/common";
import { LicensingController } from "./licensing.controller";
import { LicensingService } from "./licensing.service";
import { BlockchainConfigService } from "src/config/config.service";

@Module({
    imports: [],
    controllers: [LicensingController],
    providers: [LicensingService, BlockchainConfigService],
})

export class LicensingModule { }