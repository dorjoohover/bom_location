import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTownDto } from './town.dto';
import { TownService } from './town.service';
@ApiTags('Town')
@Controller('town')
export class TownController {
    constructor( private readonly service: TownService){}

    @Post()
    createTown(@Body() dto: CreateTownDto) {
        return this.service.createTown(dto)
    }

    @Get()
    getAllTowns() {
        return this.service.getAllTowns()
    }

@Get(':id')
    getTownById(@Param() params) {
        return this.service.getTownById(params.id)
    }
}
