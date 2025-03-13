import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { BlockchainConfigService } from 'src/config/config.service';

@Injectable()
export class FilmRightsService {
    private contract: ethers.Contract;

    constructor(private blockchainConfig: BlockchainConfigService, private configService: ConfigService) {        
        const contractAddress = this.configService.get<string>('FILM_NFT_CONTRACT_ADDRESS');        
        if (!contractAddress) {
            throw new Error('FILM_RIGHTS_CONTRACT_ADDRESS is not defined');
        }

        const abi = [
            // 🎬 Creator Registration
            'function registerCreator(address creator) external',
            'function revokeCreator(address creator) external',
            'function registerSelf() external payable',

            // 🎥 Asset Management
            'function uploadAsset(string calldata assetURI, string calldata assetMetadata, uint48 validityPeriod) external payable returns (uint256)',
            'function issueRights(address creator, string calldata assetURI, string calldata assetMetadata, uint48 validityPeriod) external returns (uint256)',

            // 🔄 License Management
            'function renewRights(uint256 tokenId, uint48 additionalTime) external payable',
            'function deactivateRights(uint256 tokenId) external',
            'function reactivateRights(uint256 tokenId) external',

            // 📊 View Functions
            'function isRightsValid(uint256 tokenId) external view returns (bool)',
            'function getAssetCreator(string calldata assetURI) external view returns (address)',
            'function getCreatorAssets(address creator) external view returns (uint256[])',
            'function getAssetTokenId(string calldata assetURI) external view returns (uint256)',

            // 💰 Fee Management
            'function setbaseRightsFee(uint256 newFee) external',
            'function toggleFees(bool enabled) external',
            'function withdrawFees() external',

            // 🎭 Rights Transfers
            'function transferFrom(address from, address to, uint256 tokenId) external',
        ];

        this.contract = new ethers.Contract(contractAddress, abi, blockchainConfig.wallet);
    }

    // 🎬 Creator Registration
    async registerCreator(creator: string) {        
        const tx = await this.contract.registerCreator(creator);
        await tx.wait();
        return { message: 'Creator registered successfully' };
    }

    async registerSelf(fee: string) {
        const tx = await this.contract.registerSelf({ value: ethers.parseEther(fee) });
        await tx.wait();
        return { message: 'Creator registered successfully' };
    }

    async revokeCreator(creator: string) {
        const tx = await this.contract.revokeCreator(creator);
        await tx.wait();
        return { message: 'Creator revoked successfully' };
    }

    // 🎥 Asset Management
    async uploadAsset(assetURI: string, assetMetadata: string, validityPeriod: number, fee: string) {
        const tx = await this.contract.uploadAsset(assetURI, assetMetadata, validityPeriod, { value: ethers.parseEther(fee) });
        await tx.wait();
        return { message: 'Asset uploaded successfully' };
    }

    async issueRights(creator: string, assetURI: string, assetMetadata: string, validityPeriod: number) {
        const tx = await this.contract.issueRights(creator, assetURI, assetMetadata, validityPeriod);
        await tx.wait();
        return { message: 'Rights issued successfully' };
    }

    // 🔄 License Management
    async renewRights(tokenId: number, additionalTime: number, fee: string) {
        const tx = await this.contract.renewRights(tokenId, additionalTime, { value: ethers.parseEther(fee) });
        await tx.wait();
        return { message: 'Rights renewed successfully' };
    }

    async deactivateRights(tokenId: number) {
        const tx = await this.contract.deactivateRights(tokenId);
        await tx.wait();
        return { message: 'Rights deactivated successfully' };
    }

    async reactivateRights(tokenId: number) {
        const tx = await this.contract.reactivateRights(tokenId);
        await tx.wait();
        return { message: 'Rights reactivated successfully' };
    }

    // 📊 View Functions
    async isRightsValid(tokenId: number) {
        return await this.contract.isRightsValid(tokenId);
    }

    async getAssetCreator(assetURI: string) {
        return await this.contract.getAssetCreator(assetURI);
    }

    async getCreatorAssets(creator: string) {
        return await this.contract.getCreatorAssets(creator);
    }

    async getAssetTokenId(assetURI: string) {
        return await this.contract.getAssetTokenId(assetURI);
    }

    // 💰 Fee Management
    async setBaseRightsFee(newFee: string) {
        const tx = await this.contract.setbaseRightsFee(ethers.parseEther(newFee));
        await tx.wait();
        return { message: 'Base rights fee updated successfully' };
    }

    async toggleFees(enabled: boolean) {
        const tx = await this.contract.toggleFees(enabled);
        await tx.wait();
        return { message: 'Fees toggled successfully' };
    }

    async withdrawFees() {
        const tx = await this.contract.withdrawFees();
        await tx.wait();
        return { message: 'Fees withdrawn successfully' };
    }

    // 🎭 Rights Transfers
    async transferRights(tokenId: number, to: string) {
        const tx = await this.contract.transferFrom(this.blockchainConfig.wallet.address, to, tokenId);
        await tx.wait();
        return { message: 'Rights transferred successfully' };
    }
}
