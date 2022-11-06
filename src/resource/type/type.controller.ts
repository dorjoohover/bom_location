import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTypeDto } from './type.dto';
import { TypeService } from './type.service';



@Controller('type')
export class TypeController {
    constructor(private service: TypeService) {}

    @Post()
    create(@Body() dto: CreateTypeDto) {
        return this.service.create(dto)
}

    @Get()
    get() {
        return this.service.get()
    }
}