import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}


  async getAllUsers() {
    let users = await this.model.find()
    if(!users)
    throw new ForbiddenException('not found')

    return users
  }

  async getUserById(id: string) {
    return await this.model.findById(id)
  }

  async getUserByEmailOrPhone(email: string,) {
    try {
      let user = await this.model.findOne({email})
        return user
    } catch (error) {
      throw new HttpException('server error', 500)
    }
  }

  async editUser(user: UserDocument, dto: UpdateUserDto) {
    
        try {
            user.password = dto.password;
            user.phone = dto.phone;
            user.userType = dto.userType
            user.username = dto.username
            user.socials = dto.socials
            user.save()
            return user
        } catch (error) {
            throw new HttpException('server error', 500)
        }
  }
}
