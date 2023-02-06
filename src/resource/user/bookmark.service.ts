import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User, UserDocument } from "src/schema";
import { AddBookmarkDto } from "./user.dto";


@Injectable()
export class BookmarkService {
    constructor(
        @InjectModel(User.name)  private model: Model<UserDocument>
    ) {}
    async addBookmark(data: AddBookmarkDto, userId: string) {
        let ad = await this.model.findOne({id: userId, bookmarks: data.adId})
        if(ad)  
        {
            ad = await this.model.findByIdAndUpdate(userId, {$pull: {bookmarks: data.adId}});
            return false
        } else 
        
           {
            ad = await this.model.findByIdAndUpdate(userId, {$push: {bookmarks: data.adId}});
            return true
           }
        
        if(!ad) throw new HttpException('error', HttpStatus.BAD_REQUEST)
    
    }
}