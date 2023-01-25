import { Body, Controller, Get, HttpException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { AdStatus } from 'src/config/enum';
import { UserAccessGuard } from 'src/guard/user.guard';
import { Ad, AdDocument } from 'src/schema';
import { CreateAdDto, FilterAdDto, SuggestionDto } from './ad.dto';
import { AdService } from './ad.service';
import { SuggestionService } from './suggestion.service';

@ApiTags('Ads')
@Controller('ad')
// @UseGuards(UserAccessGuard)
// @ApiBearerAuth("access-token")
export class AdController {
    constructor(private readonly service:AdService, private suggestionService: SuggestionService, @InjectModel(Ad.name) private model: Model<AdDocument>) {}

    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @Post()
    @ApiOperation({description: "zar create leh"})

    createAd(@Request() {user}, @Body() dto: CreateAdDto ) {
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
        return this.service.createAd(dto,  user)
    }
    

    @Get()
    // @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiOperation({description: "buh zariig harna"})
    getAllAds() {
        return this.service.getAllAds()
    }
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "zariig id gaar ni awna"})
    @Get(':id')
    getAdById(@Query('id') id) {
        return this.service.getAdById(id)
    }

    
   
    @Get('check')
    @ApiOperation({description: "adminaas verify daagui zariig harna"})
    getAdNotVerified() {
        return this.service.getAdNotVerified()
    }
    
    @Get('check/:id')
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "admin aas zar id gaar verify hiine"})
    verifyAd(@Query('id') id) {
        return this.service.verifyAd(id)
    }

    @Get('sold/:id')
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "zariig ig gaar ni status iig ni sold bolgono"})
    soldAd(@Query('id') id) {
        return this.service.updateStatusAd(id, AdStatus.sold)
    }

    @Get('timed')
    @ApiOperation({description: "todorhoi hugatsaa heterwel status g ni timed bolgono"})
    updateStatisTimed() {
        return this.service.updateStatusTimed()
    }
    
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "zar g category id gaar awna"})
    @Get('category/:id')
    getAdByCategoryId(@Query('id') id) {
        return this.service.getAdByCategoryId(id)
    }
    
    @ApiOperation({description: "zar filterdene"})
    @Post('filter')
    getFilterAd(@Body() filterAd: FilterAdDto) {
        

        return this.service.getAdByFilter(filterAd)

    }
    @ApiOperation({description: "suggest zar enum aar awah  "})
    @Post('suggesstion')
    getSuggestion(@Body() data: SuggestionDto) {
        return this.suggestionService.getSuggestionAds(data)
    }

    // @Delete()
    // async deleteAd() 
    // {
    //     return await this.model.deleteMany()
    // }
    
}
