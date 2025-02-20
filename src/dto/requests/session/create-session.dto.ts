import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSessionDto {
    @IsOptional()
    @IsString()
    uuid: string;

    @ApiProperty({ example: '0xb12.......981bq', description: 'Test Wallet' })
    @IsNotEmpty()
    user: Types.ObjectId | string;


    @ApiProperty({ example: 24, description: 'Duration in hours' })
    @IsOptional()
    @IsNumber()
    durationInHours?: number
}
