import { MailerService } from '@nestjs-modules/mailer/dist';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { UserStatus } from 'src/config/enum';
import { User, UserDocument } from 'src/schema/user.schema';
import { LoginUser, RegisterUser } from './auth.dto';
import { AuthService } from './auth.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService, @InjectModel(User.name) private model: Model<UserDocument>,private mailservice: MailerService){}

    async sendConfirmMail(email: string, code: string) {

     
         await this.mailservice.sendMail({
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
           
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:5050/auth/confirm/${code}> Click here</a>
                </div>`,
        }).catch(err => console.log(err));
    
    }

    @Post('register')
    
    @ApiOperation({description: "hereglegch uusgeh"})
    async createUser(@Body() dto: RegisterUser)  {
        const user = await this.service.register(dto)
        if(user) {
            const token = await this.service.signPayload(user.email || user.phone)
            const code = await bcrypt.hash(user.email, 10)
            user.code = code
            user.save()
            await this.sendConfirmMail(user.email, code)
            return {user, token}
        }
    }

    @Post('login')
    @ApiOperation({description: "login hiih"})
    async login(@Body() dto: LoginUser) {
        const user = await this.service.login(dto)
        if(user) {
            const token = await this.service.signPayload(user.email )
            return {user, token}
        }
    }

    @Get('confirm/:code')
    @ApiQuery({name: 'code'})
    @ApiOperation({description: "confirm code awah "})
    async confirmCode(@Query('code') code: string) {
        let user = await this.model.findOne({code})
        if(!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        user.status = UserStatus.active
        user.save();
        return user
    }

    // @Delete()
    // async d() {
    //     return await this.model.deleteMany()
    // }
}
