import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { BlockchainConfigService } from 'src/config/config.service';

@Injectable()
export class InvestmentService {
    private contract: ethers.Contract;

    constructor(private blockchainConfig: BlockchainConfigService, private configService: ConfigService) {
        const contractAddress = this.configService.get<string>('INVESTMENT_CONTRACT_ADDRESS');
        if (!contractAddress) {
            throw new Error('INVESTMENT_CONTRACT_ADDRESS is not defined');
        }
        const abi = [
            'function invest(uint256 filmId) external payable',
            'function withdrawInvestment(uint256 filmId, uint256 amount) external',
            'function getTotalInvestment(uint256 filmId) external view returns (uint256)',
        ];
        this.contract = new ethers.Contract(contractAddress, abi, blockchainConfig.wallet);
    }

    async invest(filmId: number, amount: string) {
        const tx = await this.contract.invest(filmId, { value: ethers.parseEther(amount) });
        await tx.wait();
        return { message: 'Investment successful' };
    }

    async withdrawInvestment(filmId: number, amount: string) {
        const tx = await this.contract.withdrawInvestment(filmId, ethers.parseEther(amount));
        await tx.wait();
        return { message: 'Investment withdrawn' };
    }

    async getTotalInvestment(filmId: number) {
        return await this.contract.getTotalInvestment(filmId);
    }
}
