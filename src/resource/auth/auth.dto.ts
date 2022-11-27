import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUser {
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    username: string
    
    @IsEmail()
    email: string

    @IsString()
    phone: string

    @IsBoolean()
    isAdmin: boolean
}

export class LoginUser {
    @IsNotEmpty()
    @IsString()
    password: string
    
    @IsEmail()
    email: string

    @IsString()
    phone: string
}