import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RevenueSplitService } from './revenue.service';

@ApiTags('Revenue Split')
@Controller('revenue-split')
export class RevenueSplitController {
    constructor(private readonly revenueSplitService: RevenueSplitService) { }

    @Post(':filmId/distribute')
    @ApiOperation({ summary: 'Distribute revenue to investors' })
    async distributeRevenue(@Param('filmId') filmId: number, @Body() body: { amount: string }) {
        return await this.revenueSplitService.distributeRevenue(filmId, body.amount);
    }

    @Post(':filmId/claim')
    @ApiOperation({ summary: 'Claim revenue as an investor' })
    async claimRevenue(@Param('filmId') filmId: number) {
        return await this.revenueSplitService.claimRevenue(filmId);
    }
}
