import { Injectable, HttpException, HttpStatus ,} from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User, UserDocument } from "src/schema";
import { AddBookmarkDto } from "./user.dto";


@Injectable()
export class BookmarkService {
    constructor(
        @InjectModel(User.name)  private model: Model<UserDocument>
    ) {}
    async addBookmark(data: AddBookmarkDto) {
        let ad = await this.model.findOne({id: data.userId, bookmarks: data.adId})
        if(ad) throw new HttpException('err', HttpStatus.BAD_REQUEST)
        ad = await this.model.findByIdAndUpdate(data.userId, {$push: {bookmarks: data.adId}})
        if(!ad) throw new HttpException('error', HttpStatus.BAD_REQUEST)
        return true
    }
}