import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserType } from "src/config/enum";

export class CreateUserDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsBoolean()
    @IsNotEmpty()
    isAdmin: boolean

    @ApiProperty({enum: UserType, default: UserType.default})
    userType: UserType

}

export class AddBookmarkDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    adId: number

}