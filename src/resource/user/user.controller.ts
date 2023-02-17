import { Body, Controller, Get, HttpException, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { Param, UseGuards } from '@nestjs/common/decorators';
import { UserAccessGuard } from 'src/guard/user.guard';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
@ApiTags('User')
@UseGuards(UserAccessGuard)
@ApiBearerAuth("access-token")
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    getAllUser() {
        return this.service.getAllUsers()
    }

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


    @Put()
     editUser(@Request() {user}, @Body() dto: UpdateUserDto) {
        if(!user) throw new HttpException('user not found', 400)
        return this.service.editUser(user, dto)    
    }


}
