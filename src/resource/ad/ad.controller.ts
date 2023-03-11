import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { AdStatus } from 'src/config/enum';
import { UserAccessGuard } from 'src/guard/user.guard';
import { Ad, AdDocument, Category, CategoryDocument } from 'src/schema';
import { CreateAdDto, FilterAdDto } from './ad.dto';
import { AdService } from './ad.service';
import { S3Service } from './s3.service';
import { SuggestionService } from './suggestion.service';

@ApiTags('Ads')
@Controller('ad')

export class AdController {
    constructor(private readonly service:AdService, private suggestionService: SuggestionService, @InjectModel(Ad.name) private model: Model<AdDocument>, private s3Service: S3Service, @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

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
        for(let i = 0; i < (files?.images?.length ?? 0); i++ ){
            
            const key = `${files.images[i].originalname}${Date.now()}`
            const imageUrl = await this.s3Service.uploadFile(files.images[i], key)
            await imagesUrl.push(imageUrl)
        }
        
        dto.filters = JSON.parse(dto.filters)
        if(dto.location)
        dto.location = JSON.parse(dto.location)
       
        return this.service.createAd(dto, user,  imagesUrl)
        
    }
    

    @Get(':num')
    // @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiOperation({description: "buh zariig harna"})
    @ApiParam({name: 'num'})
    async getAllAds(@Param('num') num: number) {

        let ads = await this.model.find({adStatus: 'created'}).sort({ createdAt: 'desc' }).limit(10).skip(num*10)
        let limit = 0
        limit = await this.model.count({adStatus: 'created'})
    if (!ads) throw new HttpException('not found ads', HttpStatus.NOT_FOUND);

    return {
        ads: ads, 
        limit: limit
    };
    }

    
   
    @Get('/notVerify/:num')
    @ApiOperation({description: "adminaas verify daagui zariig harna"})
    @ApiParam({name: 'num'})
    async getAdNotVerified(@Param('num') num: number) {
        
        let ads = await this.model.find({adStatus: 'pending'}).sort({ createdAt: 'desc' }).limit((num+1)*20);
        let limit = 0
        limit = await this.model.count({adStatus: 'pending'})
        if (!ads) throw new HttpException('not found ads', HttpStatus.NOT_FOUND);
        return {ads, limit};
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
    
    @Get('view/:id/:userId')
    @ApiParam({name: 'id'})
    async viewAd(@Param('id') id: string, @Param('userId') userId: string)  {
        let ad = await this.service.getAdById(id)
        if(ad.views.find(a => a.toString() == userId) == undefined && ad.user.toString() != userId) {
             await this.model.findByIdAndUpdate(ad._id, {
                $push: { views: userId },
              });
              console.log(ad.views.length)
              return ad.views.length + 1
        }
    }

    @Get('search/:value')
    @ApiQuery({name: 'value'})
    @ApiOperation({description: "search ad"})
    async searchAd(@Query('value') value: string) {
        
        let ads = await this.model.find( {$text: {$search: value}}).sort({ createdAt: 'desc' });
        let limit = 0
        limit = await this.model.count({$text: {$search: value}})
      
        if(!ads) throw new HttpException('not found', 403)
        return {ads, limit, }
    }

    @Get('sold/:id')
    @ApiParam({name: 'id', })
    @ApiOperation({description: "zariig ig gaar ni status iig ni sold bolgono"})
    soldAd(@Param('id') id) {
        return this.service.updateStatusAd(id, AdStatus.sold)
    }


    @Post('many/:num/:self')
    @ApiParam({name: 'num'})
    @ApiParam({name: 'self'})
    async manyAdById( @Body() dto: [], @Param('num') num: number, @Param('self') self: string) {
        let ads = [], limit = 0
        try {
           ads = await this.model.find({$and: [{'_id' : {$in: dto}, }, self == 'true' ? {} : {'adStatus': 'created'}]}).populate('category', 'id name', this.categoryModel).populate('subCategory', 'id name', this.categoryModel).limit((num+1) * 10).skip(num * 10);
           limit =  await this.model.count({$and: [{'_id' : {$in: dto}, }, self == 'true' ? {} : {'adStatus': 'created'}]})
        } catch (error) {
            throw new HttpException(error, 500)
        }

        if(!ads) throw new HttpException('not found', HttpStatus.NOT_FOUND) 
        return {ads, limit}
    }

    @Get('timed')
    @ApiOperation({description: "todorhoi hugatsaa heterwel status g ni timed bolgono"})
    updateStatisTimed() {
        return this.service.updateStatusTimed()
    }
    
    @ApiParam({name: 'id', })
    @ApiOperation({description: "zar g category id gaar awna"})
    @Get('category/:id/:num')
    getAdByCategoryId(@Param('id') id: string, @Param('num') num: number) {
        return this.service.getAdByCategoryId(id, num)
    }
    
    @ApiOperation({description: "zar filterdene"})
    @Post('filter')

    getFilterAd(@Body() filterAd: FilterAdDto ) {
        

        return this.service.getAdByFilter(filterAd)

    }


    @ApiOperation({description: "zar value gaar filter"})
    @Get('filter/:id/:value/:num')
    @ApiParam({name: 'id'})
    @ApiParam({name: 'num'})
    @ApiParam({name: 'value'})
    getFilterByValueAd(@Param('id') id: string, @Param('value') value: string, @Param('num') num: number) {
        let input = Buffer.from(value, 'utf-8').toString()
        return this.service.getAdByFilterValue(id, input, num)

    }
    @ApiOperation({description: "suggest zar enum aar awah  "})
    @Get('suggesstion/:type/:value/:num')

    getSuggestion(@Param('type') type: string, @Param('value') value: string, num: number) {
        let input = Buffer.from(value, 'utf-8').toString()
        return this.service.getAdByFilterValue(type, input, num)
    }
    @Get('id/:id')
    @ApiParam({name: 'id', })
    @ApiOperation({description: "zariig id gaar ni awna"})
    getAdById(@Param('id') id:string) {
        return this.service.getAdById(id)
    }

    @Delete('/:id')
    @ApiParam({name: 'id'})
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({description: "zar ustgah leh"})

    async deleteAdById(@Request() {user}, @Param('id') id: string) {
        try {
            let ad = await this.service.updateStatusAd(user['_id'], AdStatus.deleted)
            if(ad) return true
            throw new HttpException('can not delete ad', 400)
        } catch (error) {
            throw new HttpException(error, 500)
        }
    }
    // async deleteAds() 
    // {
    //     return await this.model.deleteMany()
    // }
    
}
