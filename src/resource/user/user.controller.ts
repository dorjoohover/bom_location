import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
@ApiTags('User')
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

    @Get(':email')
    getUserByEmail(@Param() params) {
        return this.service.getUserByEmailOrPhone(params.email)
    }
}
