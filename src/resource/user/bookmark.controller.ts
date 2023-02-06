import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAccessGuard } from 'src/guard/user.guard';
import { BookmarkService } from './bookmark.service';
import { AddBookmarkDto } from './user.dto';

@ApiTags('Bookmark')
@Controller('bookmark')
export class BookmarkController {
    constructor(private service: BookmarkService, ) {}

    @Post('ad')
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({description: "hereglegchiin bookmark luu zariin id nemeh"})
    addBookmark ( @Request() {user}, @Body() data: AddBookmarkDto ) {
        return this.service.addBookmark(data, user._id)
    }

}