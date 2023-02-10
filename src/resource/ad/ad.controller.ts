import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { AdStatus } from 'src/config/enum';
import { UserAccessGuard } from 'src/guard/user.guard';
import { Ad, AdDocument } from 'src/schema';
import { CreateAdDto, FilterAdDto, SuggestionDto } from './ad.dto';
import { AdService } from './ad.service';
import { S3Service } from './s3.service';
import { SuggestionService } from './suggestion.service';

@ApiTags('Ads')
@Controller('ad')

export class AdController {
    constructor(private readonly service:AdService, private suggestionService: SuggestionService, @InjectModel(Ad.name) private model: Model<AdDocument>, private s3Service: S3Service) {}

    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @Post()
    @ApiOperation({description: "zar create leh"})
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'images', maxCount: 20
      }]))
    async createAd( @Request() {user}, @Body() dto: CreateAdDto, @UploadedFiles() files: {images?: Express.Multer.File[] }) {
        
        // return dto
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
        let imagesUrl = []
        for(let i = 0; i < files.images.length / 2; i++ ){
            
            const key = `${files.images[i].originalname}${Date.now()}`
            const imageUrl = await this.s3Service.uploadFile(files.images[i], key)
            await imagesUrl.push(imageUrl)
        }
        dto.positions = JSON.parse(dto.positions)
        dto.filters = JSON.parse(dto.filters)
        dto.location = JSON.parse(dto.location)
       
        return this.service.createAd(dto, user,  imagesUrl)
        
    }
    

    @Get()
    // @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiOperation({description: "buh zariig harna"})
    async getAllAds() {
        let ads = await this.model.find({adStatus: 'created'}).sort({ createdAt: 'desc' });
    if (!ads) throw new HttpException('not found ads', HttpStatus.NOT_FOUND);
    return ads;
    }

    
   
    @Get('/notVerify')
    @ApiOperation({description: "adminaas verify daagui zariig harna"})
    async getAdNotVerified() {
        let ads = await this.model.find({adStatus: 'pending'}).sort({ createdAt: 'desc' });
        if (!ads) throw new HttpException('not found ads', HttpStatus.NOT_FOUND);
        return ads;
    }
    
    @Get('check/:id')
    @ApiParam({name: 'id', })
    @ApiOperation({description: "admin aas zar id gaar verify hiine"})
    verifyAd(@Param('id') id) {
        return this.service.updateStatusAd(id, AdStatus.created)
    }

    @Get('delete/:id')
    @ApiParam({name: 'id', })
    @ApiOperation({description: "admin aas zar id gaar delete hiine"})
    deleteAd(@Param('id') id) {
        return this.service.updateStatusAd(id, AdStatus.deleted)
    }
    
    @Get('search/:value')
    @ApiQuery({name: 'value'})
    @ApiOperation({description: "search ad"})
    async searchAd(@Query('value') value: string) {
        
        let ad = await this.model.find( {$text: {$search: value}})
      
        if(!ad) throw new HttpException('not found', 403)
        return ad
    }

    @Get('sold/:id')
    @ApiParam({name: 'id', })
    @ApiOperation({description: "zariig ig gaar ni status iig ni sold bolgono"})
    soldAd(@Param('id') id) {
        return this.service.updateStatusAd(id, AdStatus.sold)
    }


    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @Post('user')
    @ApiOperation({description: "zariig user id gaar ni awna"})
    adByUser( @Request() {user}) {
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
        let ads = this.service.getAdsByUserId(user._id)
        return ads
    }

    @Get('timed')
    @ApiOperation({description: "todorhoi hugatsaa heterwel status g ni timed bolgono"})
    updateStatisTimed() {
        return this.service.updateStatusTimed()
    }
    
    @ApiParam({name: 'id', })
    @ApiOperation({description: "zar g category id gaar awna"})
    @Get('category/:id')
    getAdByCategoryId(@Param('id') id: string) {
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
    @Get('/:id')
    @ApiParam({name: 'id', })
    @ApiOperation({description: "zariig id gaar ni awna"})
    getAdById(@Param('id') id:string) {
        return this.service.getAdById(id)
    }

    
    @Delete()
    async deleteAds() 
    {
        return await this.model.deleteMany()
    }
    
}
