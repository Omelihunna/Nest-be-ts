import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LicensingService } from './licensing.service';

@ApiTags('Licensing')
@Controller('licensing')
export class LicensingController {
    constructor(private readonly licensingService: LicensingService) { }

    @Post(':filmId/issue')
    @ApiOperation({ summary: 'Issue a license for a film' })
    async issueLicense(@Param('filmId') filmId: number, @Body() body: { licensee: string; price: string }) {
        return await this.licensingService.issueLicense(filmId, body.licensee, body.price);
    }

    @Post(':filmId/revoke')
    @ApiOperation({ summary: 'Revoke an existing license' })
    async revokeLicense(@Param('filmId') filmId: number) {
        return await this.licensingService.revokeLicense(filmId);
    }
}
