import { Body, Controller, Get, Post } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { ApiTags } from '@nestjs/swagger';
import { DiscrictDto } from './district.dto';
import { DistrictService } from './district.service';

@ApiTags('Disctrict')
@Controller('district')
export class DistrictController {
    constructor(private service: DistrictService) {}
    @Post()
    create(@Body() dto: DiscrictDto) {
        return this.service.create(dto)
    }

    @Get()
    getData() {
        return this.service.getData()
    }

    @Get(':id')
    getDataById(params) {
        return this.service.getDataById(params.id)
    }
}
