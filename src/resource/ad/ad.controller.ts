import { Controller, Post, Get, Body, Param, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdDto, FilterAdDto } from './ad.dto';
import { AdService } from './ad.service';
import { AuthGuard } from '@nestjs/passport/dist';

@ApiTags('Ads')
@Controller('ad')
export class AdController {
    constructor(private readonly service:AdService) {}

    @UseGuards(AuthGuard('jwt'))
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
    
    
    @Post('filter')
    getFilterAd(@Body() filterAd: FilterAdDto) {
        
        let ads = filterAd.filters.map(async (f) => {
            let ad = await this.service.getAdByFilter({id: f.id, maxValue: f.maxValue, minValue: f.minValue, value: f.value})
            return ad

        })
        
        return Promise.all(ads).then((r) => r[0])

    }
    
}
