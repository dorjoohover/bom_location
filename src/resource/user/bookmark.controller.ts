import {Controller, Post, Body, Get} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { AddBookmarkDto } from './user.dto';

@ApiTags('Bookmark')
@Controller('bookmark')
export class BookmarkController {
    constructor(private service: BookmarkService, ) {}

    @Post('add')
    addBookmark (@Body() data: AddBookmarkDto ) {
        return this.service.addBookmark(data)
    }

}