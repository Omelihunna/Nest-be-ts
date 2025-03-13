import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { BlockchainConfigService } from 'src/config/config.service';

@Injectable()
export class LicensingService {
    private contract: ethers.Contract;

    constructor(private blockchainConfig: BlockchainConfigService, private configService: ConfigService) {
        const contractAddress = this.configService.get<string>('LICENSING_CONTRACT_ADDRESS');
        if (!contractAddress) {
            throw new Error('LICENSING_CONTRACT_ADDRESS is not defined');
        }
        const abi = [
            'function issueLicense(uint256 filmId, address licensee) external payable',
            'function revokeLicense(uint256 filmId) external',
        ];
        this.contract = new ethers.Contract(contractAddress, abi, blockchainConfig.wallet);
    }

    async issueLicense(filmId: number, licensee: string, price: string) {
        const tx = await this.contract.issueLicense(filmId, licensee, { value: ethers.parseEther(price) });
        await tx.wait();
        return { message: `License issued to ${licensee} for Film ID: ${filmId}` };
    }

    async revokeLicense(filmId: number) {
        const tx = await this.contract.revokeLicense(filmId);
        await tx.wait();
        return { message: `License revoked for Film ID: ${filmId}` };
    }
}
