import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSessionDto {
    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsBoolean()
    logged_out?: boolean;

    @IsOptional()
    @IsBoolean()
    expired?: boolean;
}
