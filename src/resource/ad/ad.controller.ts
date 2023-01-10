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
    @ApiOperation({description: "Create ad"})

    createAd(@Request() {user}, @Body() dto: CreateAdDto ) {
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
        return this.service.createAd(dto,  user)
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
    getAdById(@Query('id') id) {
        return this.service.getAdById(id)
    }
    
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "View ad by category id"})
    @Get('category/:id')
    getAdByCategoryId(@Query('id') id) {
        return this.service.getAdByCategoryId(id)
    }
    
    @ApiOperation({description: "Get ad by filters"})
    @Post('filter')
    getFilterAd(@Body() filterAd: FilterAdDto) {
        

        return this.service.getAdByFilter(filterAd)

    }
    @ApiOperation({description: "Get suggesstion ad"})
    @Post('suggesstion')
    getSuggestion(@Body() data: SuggestionDto) {
        return this.suggestionService.getSuggestionAds(data)
    }
    
}
