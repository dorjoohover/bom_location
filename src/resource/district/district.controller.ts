import { Body, Controller, Post } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { DiscrictDto } from './district.dto';
import { DistrictService } from './district.service';

@Controller('district')
export class DistrictController {
    constructor(private service: DistrictService) {}
    @Post()
    create(@Body() dto: DiscrictDto) {
        return this.service.create(dto)
    }
}
