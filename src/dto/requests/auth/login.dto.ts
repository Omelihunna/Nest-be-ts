import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'test@filmfusion.com', description: 'User email address' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'strongpassword', description: 'User password' })
    password: string;
}