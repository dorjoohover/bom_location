import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUser, RegisterUser } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}

    @Post('register')
    async createUser(@Body() dto: RegisterUser)  {
        const user = await this.service.register(dto)
        if(user) {
            const token = await this.service.signPayload(user.email || user.phone)
            return {user, token}
        }
    }

    @Post('login')
    async login(@Body() dto: LoginUser) {
        const user = await this.service.login(dto)
        if(user) {
            const token = await this.service.signPayload(user.email || user.phone)
            return {user, token}
        }
    }
}
