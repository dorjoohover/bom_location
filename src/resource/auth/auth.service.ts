import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import appConfig from 'src/config/app.config';
import { User, UserDocument } from 'src/schema';
import { UserService } from '../user/user.service';
import { LoginUser, RegisterUser } from './auth.dto';
import { UserStatus, UserType } from 'src/config/enum';

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
                if(user) throw new HttpException('registered user', HttpStatus.BAD_REQUEST)
                if(hashed) {
                    const createdUser = await this.model.create({
                        username: dto.username,
                        email: dto.email,
                        phone: dto.phone,
                        password: hashed,
                        point: 1000
                      });
                    return createdUser
                } else {
                    throw new HttpException('did not hash password', 500)
                }
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN)
        }
    }

  
    async login(dto: LoginUser) {
        try {
            
            if(dto.email != null && dto.password != null && dto.password != "") {
                let user = await this.model.findOne({email: dto.email})
                
                if(!user) return {status: false, message: 'not found user'}
                if(user.status == UserStatus.banned) return {status: false, message: 'banned'}
                let password = user.password
                if(!user.password) throw new HttpException('system error', 500)
              
                const check = await bcrypt.compare(dto.password, password)
                if(check) {
                    
                    return {status: true, user: user}
                } else {
                 
                    return {status: false, message: 'password not match'}
                }
               
             
                
                
            }
            
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN )
        }
    }


}

