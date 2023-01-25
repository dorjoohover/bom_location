import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { AddBookmarkDto } from './user.dto';

@ApiTags('Bookmark')
@Controller('bookmark')
export class BookmarkController {
    constructor(private service: BookmarkService, ) {}

    @Post('ad')
    
    @ApiOperation({description: "hereglegchiin bookmark luu zariin id nemeh"})
    addBookmark (@Body() data: AddBookmarkDto ) {
        return this.service.addBookmark(data)
    }

}