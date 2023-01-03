import { Controller, Post, Get, Body, Param, Request, UseGuards,HttpException, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes,ApiBody, ApiCreatedResponse,ApiParam, ApiOperation , ApiQuery, ApiProperty } from '@nestjs/swagger';
import { CreateAdDto, FilterAdDto, SuggestionDto,  } from './ad.dto';
import { AdService } from './ad.service';
import { AuthGuard } from '@nestjs/passport/dist';
import { FileFieldsInterceptor, FileInterceptor,  } from '@nestjs/platform-express';
import { SuggestionService } from './suggestion.service';
import { UserAccessGuard } from 'src/guard/user.guard';
import { AdType } from 'src/config/enum';

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
    @ApiOperation({description: "Create ad"})
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 2 },
  { name: 'background', maxCount:1 },
      ]))
    createAd(@Request() {user}, @Body() dto: CreateAdDto ,@UploadedFiles() file: {avatar?: Express.Multer.File[], background?: Express.Multer.File}) {
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
        return this.service.createAd(dto, file, user)
    }
    

    @Get()
    // @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiOperation({description: "View all ads"})
    getAllAds() {
        return this.service.getAllAds()
    }
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "View ad by id"})
    @Get(':id')
    getAdById(@Query('id') params) {
        return this.service.getAdById(params.id)
    }
    
    @ApiOperation({description: "Get ad by filters"})
    @Post('filter')
    // getFilterAd(@Body() filterAd: FilterAdDto) {
        
    //     let ads = filterAd.filters.map(async (f) => {
    //         let ad = await this.service.getAdByFilter({id: f.id, maxValue: f.maxValue, minValue: f.minValue, value: f.value})
    //         return ad

    //     })
        
    //     return Promise.all(ads).then((r) => r[0])

    // }
    @ApiOperation({description: "Get suggesstion ad"})
    @Post('suggesstion')
    getSuggestion(@Body() data: SuggestionDto) {
        return this.suggestionService.getSuggestionAds(data)
    }
    
}
