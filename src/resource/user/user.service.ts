import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>, @InjectModel(User.name) private adModel: Model<UserDocument>) {}


  async getAllUsers() {
    let users = await this.model.find()
    if(!users)
    throw new ForbiddenException('not found')

    return users
  }

  async getUserById(id: string) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      return await this.model.findById(id)
    }else {
      return await this.model.findOne({email: id})
    }
  }

  async getUserByEmailOrPhone(email: string,) {
    try {
      let user = await this.model.findOne({email})
        return user
    } catch (error) {
      throw new HttpException('server error', 500)
    }
  }

  async editUser(user: UserDocument, dto: UpdateUserDto, image?: string) {
    
        try {

          let img = image != "" ? image : user.profileImg

            user.phone = dto.phone ?? user.phone;
            user.userType = dto.userType ?? user.userType
            user.username = dto.username ?? user.username
            user.birthday = dto.birthday ??  user.birthday
            user.socials = dto.socials ?? user.socials
            user.profileImg = img
            user.save()
            return user
        } catch (error) {
            throw new HttpException('server error', 500)
        }
  }
}
