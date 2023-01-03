import { Body, Controller, Get, Param, Post, Query, Req, Request, HttpException} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common/decorators';
import { UserAccessGuard } from 'src/guard/user.guard';
@ApiTags('User')
@UseGuards(UserAccessGuard)
@ApiBearerAuth("access-token")
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.service.createUser(dto)
    }

    @Get()
    getAllUser() {
        return this.service.getAllUsers()
    }

    @Get('me')
    async getUserByEmail(@Request() {user}) {
        if (!user) return null
    return user
  
    }
}
