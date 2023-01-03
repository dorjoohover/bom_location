import {Controller, Post, Body, Get} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { AddBookmarkDto } from './user.dto';

@ApiTags('Bookmark')
@Controller('bookmark')
export class BookmarkController {
    constructor(private service: BookmarkService, ) {}

    @Post('ad')
    @ApiOperation({description: "Add bookmark to user"})
    addBookmark (@Body() data: AddBookmarkDto ) {
        return this.service.addBookmark(data)
    }

}