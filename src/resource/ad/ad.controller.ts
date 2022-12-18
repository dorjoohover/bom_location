import { Controller, Post, Get, Body, Param, Request, UseGuards,HttpException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes,ApiBody  } from '@nestjs/swagger';
import { CreateAdDto, FilterAdDto, SuggestionDto,  } from './ad.dto';
import { AdService } from './ad.service';
import { AuthGuard } from '@nestjs/passport/dist';
import { FileInterceptor,  } from '@nestjs/platform-express';
import { SuggestionService } from './suggestion.service';
import { UserAccessGuard } from 'src/guard/user.guard';

@ApiTags('Ads')
@Controller('ad')
// @UseGuards(UserAccessGuard)
// @ApiBearerAuth("access-token")
export class AdController {
    constructor(private readonly service:AdService, private suggestionService: SuggestionService) {}

    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    createAd(@Request() {user}, @Body() dto: CreateAdDto,  @UploadedFile() file: Express.Multer.File) {
        console.log(dto)
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
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
    
    
    @Post('filter')
    getFilterAd(@Body() filterAd: FilterAdDto) {
        
        let ads = filterAd.filters.map(async (f) => {
            let ad = await this.service.getAdByFilter({id: f.id, maxValue: f.maxValue, minValue: f.minValue, value: f.value})
            return ad

        })
        
        return Promise.all(ads).then((r) => r[0])

    }

    @Post('suggesstion')
    getSuggestion(@Body() data: SuggestionDto) {
        return this.suggestionService.getSuggestionAds(data)
    }
    
}
