import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreatePostionDto } from './position.dto';
import { PositionService } from './position.service';

@Controller('position')
export class PositionController {
    constructor(private readonly service: PositionService) {}

    @Post()
    createPosition(@Body() dto: CreatePostionDto) {
        return this.service.createPosition(dto)
    }

    @Get()
    getAllPositions() {
        return this.service.getAllPositions()
    }

    @Get(':id')
    getPositionById(@Param() params) {
        return this.service.getPositionById(params.id)
    }
}
