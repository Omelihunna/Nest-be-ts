import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { BlockchainConfigService } from 'src/config/config.service';

@Injectable()
export class RevenueSplitService {
    private contract: ethers.Contract;

    constructor(private blockchainConfig: BlockchainConfigService, private configService: ConfigService) {
        const contractAddress = this.configService.get<string>('REVENUE_SPLIT_CONTRACT_ADDRESS');
        if (!contractAddress) {
            throw new Error('REVENUE_SPLIT_CONTRACT_ADDRESS is not defined');
        }
        const abi = [
            'function distributeRevenue(uint256 filmId) external payable',
            'function claimRevenue(uint256 filmId) external',
        ];
        this.contract = new ethers.Contract(contractAddress, abi, blockchainConfig.wallet);
    }

    async distributeRevenue(filmId: number, amount: string) {
        const tx = await this.contract.distributeRevenue(filmId, { value: ethers.parseEther(amount) });
        await tx.wait();
        return { message: `Revenue of ${amount} ETH distributed for Film ID: ${filmId}` };
    }

    async claimRevenue(filmId: number) {
        const tx = await this.contract.claimRevenue(filmId);
        await tx.wait();
        return { message: `Revenue claimed for Film ID: ${filmId}` };
    }
}
