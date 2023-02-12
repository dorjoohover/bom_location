import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
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

    @ApiProperty({enum: UserType, default: UserType.default})
    userType: UserType

}
export class UpdateUserDto {


    @ApiProperty()
    username?: string

    @ApiProperty()
    phone?: string

    @ApiProperty()
    password?: string

    @ApiProperty({enum: UserType, default: UserType.default})
    userType?: UserType

    @ApiProperty({isArray: true})
    socials?: []

}

export class AddBookmarkDto {

    @IsNotEmpty()
    @ApiProperty()
    adId: string

}