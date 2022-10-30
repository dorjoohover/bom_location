import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateAdDto } from './ad.dto';
import { AdService } from './ad.service';

@Controller('ad')
export class AdController {
    constructor(private readonly service:AdService) {}

    @Post()
    createAd(@Body() dto: CreateAdDto) {
        return this.service.createAd(dto)
    }

    @Get()
    getAllAds() {
        return this.service.getAllAds()
    }

    @Get(':id')
    getAdById(@Param() params) {
        return this.service.getAdById(params.id)
    }
    
}
