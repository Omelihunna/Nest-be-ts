import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { FilmRightsService } from './film-nft.service';

@ApiTags('FilmRights')
@Controller('film-rights')
export class FilmRightsController {
    constructor(private readonly filmRightsService: FilmRightsService) {}

    // 🎬 Creator Registration
    @Post('/register')
    @ApiOperation({ summary: 'Register a creator (admin only)' })
    @ApiBody({ schema: { properties: { creator: { type: 'string', example: '0x123...' } } } })
    async registerCreator(@Body() body: { creator: string }) {
        return await this.filmRightsService.registerCreator(body.creator);
    }

    @Post('/register/self')
    @ApiOperation({ summary: 'Self-register as a creator' })
    @ApiBody({ schema: { properties: { fee: { type: 'string', example: '0.01' } } } })
    async registerSelf(@Body() body: { fee: string }) {
        return await this.filmRightsService.registerSelf(body.fee);
    }

    @Post('/revoke')
    @ApiOperation({ summary: 'Revoke a creator’s registration (admin only)' })
    @ApiBody({ schema: { properties: { creator: { type: 'string', example: '0x123...' } } } })
    async revokeCreator(@Body() body: { creator: string }) {
        return await this.filmRightsService.revokeCreator(body.creator);
    }

    // 🎥 Upload & Issue Rights
    @Post('/upload')
    @ApiOperation({ summary: 'Upload a new asset and issue rights' })
    @ApiBody({
        schema: {
            properties: {
                assetURI: { type: 'string', example: 'ipfs://Qm...' },
                assetMetadata: { type: 'string', example: '{"title": "Film Name", "genre": "Sci-Fi"}' },
                validityPeriod: { type: 'number', example: 31536000 },
                fee: { type: 'string', example: '0.02' },
            },
        },
    })
    async uploadAsset(@Body() body: { assetURI: string; assetMetadata: string; validityPeriod: number; fee: string }) {
        return await this.filmRightsService.uploadAsset(body.assetURI, body.assetMetadata, body.validityPeriod, body.fee);
    }

    @Post('/issue')
    @ApiOperation({ summary: 'Admin issues rights for an asset' })
    @ApiBody({
        schema: {
            properties: {
                creator: { type: 'string', example: '0x123...' },
                assetURI: { type: 'string', example: 'ipfs://Qm...' },
                assetMetadata: { type: 'string', example: 'Metadata JSON string' },
                validityPeriod: { type: 'number', example: 31536000 },
            },
        },
    })
    async issueRights(@Body() body: { creator: string; assetURI: string; assetMetadata: string; validityPeriod: number }) {
        return await this.filmRightsService.issueRights(body.creator, body.assetURI, body.assetMetadata, body.validityPeriod);
    }

    // 🔄 Rights Management
    @Patch('/:tokenId/renew')
    @ApiOperation({ summary: 'Renew rights for an asset' })
    @ApiParam({ name: 'tokenId', type: 'number', example: 1 })
    @ApiBody({ schema: { properties: { additionalTime: { type: 'number', example: 31536000 }, fee: { type: 'string', example: '0.005' } } } })
    async renewRights(@Param('tokenId') tokenId: number, @Body() body: { additionalTime: number; fee: string }) {
        return await this.filmRightsService.renewRights(tokenId, body.additionalTime, body.fee);
    }

    @Patch('/:tokenId/deactivate')
    @ApiOperation({ summary: 'Deactivate an asset’s rights' })
    @ApiParam({ name: 'tokenId', type: 'number', example: 1 })
    async deactivateRights(@Param('tokenId') tokenId: number) {
        return await this.filmRightsService.deactivateRights(tokenId);
    }

    @Patch('/:tokenId/reactivate')
    @ApiOperation({ summary: 'Reactivate an asset’s rights' })
    @ApiParam({ name: 'tokenId', type: 'number', example: 1 })
    async reactivateRights(@Param('tokenId') tokenId: number) {
        return await this.filmRightsService.reactivateRights(tokenId);
    }

    // 📊 View Functions
    @Get('/is-valid/:tokenId')
    @ApiOperation({ summary: 'Check if rights are valid for a token' })
    @ApiParam({ name: 'tokenId', type: 'number', example: 1 })
    async isRightsValid(@Param('tokenId') tokenId: number) {
        return await this.filmRightsService.isRightsValid(tokenId);
    }

    @Get('/creator/:assetURI')
    @ApiOperation({ summary: 'Get creator of an asset' })
    @ApiParam({ name: 'assetURI', type: 'string', example: 'ipfs://Qm...' })
    async getAssetCreator(@Param('assetURI') assetURI: string) {
        return await this.filmRightsService.getAssetCreator(assetURI);
    }

    @Get('/assets/:creator')
    @ApiOperation({ summary: 'Get assets of a creator' })
    @ApiParam({ name: 'creator', type: 'string', example: '0x123...' })
    async getCreatorAssets(@Param('creator') creator: string) {
        return await this.filmRightsService.getCreatorAssets(creator);
    }

    @Get('/token-id/:assetURI')
    @ApiOperation({ summary: 'Get token ID from an asset URI' })
    @ApiParam({ name: 'assetURI', type: 'string', example: 'ipfs://Qm...' })
    async getAssetTokenId(@Param('assetURI') assetURI: string) {
        return await this.filmRightsService.getAssetTokenId(assetURI);
    }

    // 💰 Fee Management
    @Patch('/fees/update')
    @ApiOperation({ summary: 'Update base rights fee' })
    @ApiBody({ schema: { properties: { newFee: { type: 'string', example: '0.01' } } } })
    async setBaseRightsFee(@Body() body: { newFee: string }) {
        return await this.filmRightsService.setBaseRightsFee(body.newFee);
    }

    @Patch('/fees/toggle')
    @ApiOperation({ summary: 'Toggle fees on/off' })
    @ApiBody({ schema: { properties: { enabled: { type: 'boolean', example: true } } } })
    async toggleFees(@Body() body: { enabled: boolean }) {
        return await this.filmRightsService.toggleFees(body.enabled);
    }

    @Post('/fees/withdraw')
    @ApiOperation({ summary: 'Withdraw collected fees (admin only)' })
    async withdrawFees() {
        return await this.filmRightsService.withdrawFees();
    }

    // 🎭 Rights Transfers
    @Post('/:tokenId/transfer')
    @ApiOperation({ summary: 'Transfer film rights' })
    @ApiParam({ name: 'tokenId', type: 'number', example: 1 })
    @ApiBody({ schema: { properties: { to: { type: 'string', example: '0x456...' } } } })
    async transferRights(@Param('tokenId') tokenId: number, @Body() body: { to: string }) {
        return await this.filmRightsService.transferRights(tokenId, body.to);
    }
}
