import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSessionDto {
    @IsNotEmpty()
    @IsString()
    uuid: string;

    @IsNotEmpty()
    user: Types.ObjectId;
}
