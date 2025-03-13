import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainConfigService {
    public provider: ethers.JsonRpcProvider;
    public wallet: ethers.Wallet;

    constructor(private configService: ConfigService) {
        const rpcUrl = this.configService.get<string>('RPC_URL');
        const privateKey = this.configService.get<string>('PRIVATE_KEY');
        console.log(privateKey)        
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        this.wallet = new ethers.Wallet(privateKey as string, this.provider);
    }
}
