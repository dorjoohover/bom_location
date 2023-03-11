import { MailerService } from '@nestjs-modules/mailer/dist';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import appConfig from 'src/config/app.config';

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
                <a href=http://bom-location.herokuapp.com/auth/confirm/${code}> Click here</a>
                </div>`,
        }).catch(err => console.log(err));
    
    }

    @Post('register')
    @ApiOperation({description: "hereglegch uusgeh"})
    async createUser(@Body() dto: RegisterUser)  {
        const user = await this.service.register(dto)
        if(user) {
            const code = Math.round(Math.random() * 10000000000).toString() + Date.now()
            user.code = code
            user.save()
            await this.sendConfirmMail(user.email, code)
            return false
        }

    }

    @Post('login')
    @ApiOperation({description: "login hiih"})
    async login(@Body() dto: LoginUser) {
        const user = await this.service.login(dto)
        if(user ) {
            
                const token = await this.service.signPayload(user.email )
            return {user, token}
            
        } else {
            return false
        }
    }

   

    @Get('confirm/:code')
    @ApiParam({name: 'code'})
    @ApiOperation({description: "confirm code awah "})
    async confirmCode(@Param('code') code: string, @Res() res) {
        let user = await this.model.findOne({code})
        if(!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        if(user.status != UserStatus.active) {
            user.status = UserStatus.active
            user.save();
        }
        return res.redirect(appConfig().link)
        
    }



    // @Delete()
    // async d() {
    //     return await this.model.deleteMany()
    // }
}
