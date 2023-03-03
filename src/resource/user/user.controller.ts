import { Body, Controller, Get, HttpException, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { Param, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { UserAccessGuard } from 'src/guard/user.guard';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { S3Service } from '../ad/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('User')

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService, private s3Service: S3Service) {}

    @Get()
    getAllUser() {
        return this.service.getAllUsers()
    }
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth("access-token")
    @Get('me')
    async getUserByEmail(@Request() {user}) {
        if (!user) return null
        return user
  
    }

    @Get(':id')
    @ApiParam({name: 'id'})
    async getUserById(@Param('id') id:string) {
        return this.service.getUserById(id)
    }

    @UseGuards(UserAccessGuard)
    @ApiBearerAuth("access-token")
    @UseInterceptors(FileInterceptor('file'))
    @Put()
     editUser(@Request() {user}, @Body() dto: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
        if(!user) throw new HttpException('user not found', 400)
        console.log(file)
        return this.service.editUser(user, dto)    
    }


}
    