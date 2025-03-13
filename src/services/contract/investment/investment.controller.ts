import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { InvestmentService } from './investment.service';

@ApiTags('Investment')
@Controller('investment')
export class InvestmentController {
    constructor(private readonly investmentService: InvestmentService) { }

    @Post(':filmId/invest')
    @ApiOperation({ summary: 'Invest in a film' })
    @ApiParam({ name: 'filmId', required: true })
    async invest(@Param('filmId') filmId: number, @Body() body: { amount: string }) {
        return await this.investmentService.invest(filmId, body.amount);
    }

    @Post(':filmId/withdraw')
    @ApiOperation({ summary: 'Withdraw investment' })
    @ApiParam({ name: 'filmId', required: true })
    async withdrawInvestment(@Param('filmId') filmId: number, @Body() body: { amount: string }) {
        return await this.investmentService.withdrawInvestment(filmId, body.amount);
    }

    @Get(':filmId/total')
    @ApiOperation({ summary: 'Get total investment for a film' })
    async getTotalInvestment(@Param('filmId') filmId: number) {
        return await this.investmentService.getTotalInvestment(filmId);
    }
}
