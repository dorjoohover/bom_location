import { Body, Controller, Get, HttpException, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { Param, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserAccessGuard } from 'src/guard/user.guard';
import { S3Service } from '../ad/s3.service';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
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
    @Get("point/:id/:point")
    @ApiParam({name: 'id'})
    @ApiParam({name: 'point'})
    async sendPoint(@Request() {user} , @Param('id') id: string, @Param('point') point: number) {
        if(!user) throw new HttpException('user not found', 400)
        let receiver = await this.service.getUserById(id)
        if(!receiver) return {message: 'not found receiver', status: 400}
        if(user.point > point) {
            user.point = user.point - point
            await user.save()
            receiver.point = receiver.point + point
            await receiver.save()
            return {message: 'success' , status: 200}
        }
        return {message: 'not enough points' , status: 400}
       
    }
    
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth("access-token")
    @UseInterceptors(FileInterceptor('file'))
    @Put()
    async  editUser(@Request() {user}, @Body() dto: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
       
        if(!user) throw new HttpException('user not found', 400)
        dto.socials = JSON.parse(dto.socials)
        let imageUrl , key
        if(file) {
             key = `${file.originalname}${Date.now()}`
             imageUrl = await this.s3Service.uploadFile(file, key)
        }

        return this.service.editUser(user, dto, imageUrl ?? '')    
    }


}
    