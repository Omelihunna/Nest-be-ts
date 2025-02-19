import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class RegisterDto {
    // @IsNotEmpty()
    @ApiProperty({ example: '0xb.....1234', description: 'User wallet Id', required: false })
    walletId: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'John', description: 'Username' })
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'test@filmfusion.com', description: 'User email address' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'strongpassword', description: 'User password' })
    password: string;
}