import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { PointSendType, UserType } from "src/config/enum";

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
    birthday?: string

    @ApiProperty()
    password?: string

    @ApiProperty({enum: UserType, default: UserType.default})
    userType?: UserType

    @ApiProperty()
    socials?: any

}

export class AddBookmarkDto {

    @IsNotEmpty()
    @ApiProperty()
    adId: string

}

export class PointHistory {
    @ApiProperty()
    point?: number

    @ApiProperty()
    sender?: string
    @ApiProperty()
    receiver?: string

    @ApiProperty({enum: PointSendType,})
    type?: PointSendType

}
