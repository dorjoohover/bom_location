import {Injectable,Inject,ForbiddenException, HttpException, HttpStatus, forwardRef} from '@nestjs/common'

import { LoginUser, RegisterUser } from './auth.dto';
import * as bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema';

@Injectable()
export class AuthService {
    
    constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}
    async signPayload(payload: string) {
        return sign(payload, 'SECRET',)
    }  
    async findByPayload(payload: string) {
        return await this.model.findOne({$or: [{email: payload}, {phone: payload}]})
    }
    async getUserByEmailOrPhone(email: string,) {
        let user = await this.model.findOne({email})
        if(user) throw new HttpException('user already exists', HttpStatus.BAD_REQUEST)
        return user
      }
    async validateUser(payload: string) {
        return await this.findByPayload(payload)
    }
    async register(dto: RegisterUser) {
        try {
            if(dto.email != null || dto.phone != null && dto.password != null) {
                const hashed = await bcrypt.hash(dto.password, 10)
                let user = await this.getUserByEmailOrPhone(dto.email)
                const createdUser = await this.model.create({
                    username: dto.username,
                    email: dto.email,
                    phone: dto.phone,
                    password: hashed,
                    isAdmin: dto.isAdmin
                  });
                return createdUser
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN)
        }
    }

  
    async login(dto: LoginUser) {
        try {
            if(dto.email != null && dto.password !=null || dto.phone !=null) {
                const user:User = await this.getUserByEmailOrPhone(dto.email)
                const checkPassword = this.checkPassword(dto.password, user.password)
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