import { ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}
  async createUser(dto: CreateUserDto) {
    let user = await this.model.findOne({ email: dto.email });
    if (user) throw new ForbiddenException('found this email');
    user = await this.model.create({
      username: dto.username,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      isAdmin: dto.isAdmin
    });
    return user
  }

  async getAllUsers() {
    let users = await this.model.find()
    if(!users)
    throw new ForbiddenException('not found')

    return users
  }

  async findByPayload(payload: string) {
    return await this.model.findOne({$or: [{email: payload}, {phone: payload}]})
  }

  async getUserByEmailOrPhone(email?: string, phone?: string) {
    let user = await this.model.findOne({$or: [{email},{phone}]})
    if(!user)
    throw new ForbiddenException('not found ')
    return user
  }
}
