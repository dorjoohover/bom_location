import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUser {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string
    
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    phone: string

    @IsBoolean()
    isAdmin: boolean
}

export class LoginUser {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string
    
    @ApiProperty()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @IsString()
    phone: string
}