import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema';
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
      profileImg: dto.profileImg,
    });
    return user
  }

  async getAllUsers() {
    let users = await this.model.find()
    if(!users)
    throw new ForbiddenException('not found')

    return users
  }

  async getUserByEmail(email) {
    let user = await this.model.findOne({email})
    if(!user)
    throw new ForbiddenException('not found ')
    return user
  }
}
