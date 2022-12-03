import { Controller, Post, Get, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAdDto } from './ad.dto';
import { AdService } from './ad.service';

@Controller('ad')
export class AdController {
    constructor(private readonly service:AdService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createAd(@Body() dto: CreateAdDto, @UploadedFile() file: Express.Multer.File) {
        return this.service.createAd(dto, file)
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
