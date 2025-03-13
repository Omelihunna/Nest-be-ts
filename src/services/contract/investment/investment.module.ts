import { Module } from "@nestjs/common";
import { InvestmentController } from "./investment.controller";
import { InvestmentService } from "./investment.service";
import { BlockchainConfigService } from "src/config/config.service";

@Module({
    imports: [],
    controllers: [InvestmentController],
    providers: [InvestmentService, BlockchainConfigService],
})

export class InvestmentModule { }