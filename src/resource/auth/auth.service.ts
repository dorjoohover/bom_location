import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import appConfig from 'src/config/app.config';
import { User, UserDocument } from 'src/schema';
import { UserService } from '../user/user.service';
import { LoginUser, RegisterUser } from './auth.dto';

@Injectable()
export class AuthService {
    
    constructor(@InjectModel(User.name) private model: Model<UserDocument>, private userService: UserService) {}
    async signPayload(payload: string) {
        return sign(payload, appConfig().appSecret,)
    }  

    async validateUser(payload: string) {
        let user = await this.model.findOne({email: payload})
        if(!user) throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
        return user
    }
    async register(dto: RegisterUser) {
        try {
            if(dto.email != null || dto.phone != null && dto.password != null) {
                const hashed = await bcrypt.hash(dto.password, 10)
                let user = await this.userService.getUserByEmailOrPhone(dto.email)
                const createdUser = await this.model.create({
                    username: dto.username,
                    email: dto.email,
                    phone: dto.phone,
                    password: hashed,
                  });
                return createdUser
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN)
        }
    }

  
    async login(dto: LoginUser) {
        try {
            if(dto.email != null && dto.password !=null) {
                let user = await this.model.findOne({email: dto.email})
                if(!user) throw new HttpException('wrong email or password', HttpStatus.BAD_REQUEST)
                const checkPassword = this.checkPassword(dto.password, user.password)
                if(user.status != 'active') throw new HttpException('check your email', HttpStatus.FORBIDDEN)
                if(checkPassword) {
                    return user
                } else {
                    return null
                }
                
                
            }
            
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN )
        }
    }

    async checkPassword(password: string, checkPassword: string) {
        bcrypt.compare(password, checkPassword, (err, result) => {
            if(result) {
                return true
            }
            else {
               return false
            }
        })
    }
}

