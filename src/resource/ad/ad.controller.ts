import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';

import { InjectModel } from '@nestjs/mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Cron } from '@nestjs/schedule/dist';
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
    constructor(private readonly service:AdService, private suggestionService: SuggestionService, @InjectModel(Ad.name) private model: Model<AdDocument>, private s3Service: S3Service, @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {

    }
   
   
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

        let ads = await this.model.find({adStatus: 'created'}).populate('category', 'id name', this.categoryModel).populate('subCategory', 'id name', this.categoryModel).limit(10).skip(num*10)
        let limit = 0
        limit = await this.model.count({adStatus: 'created'})
    if (!ads) throw new HttpException('not found ads', HttpStatus.NOT_FOUND);

    return {
        ads: ads, 
        limit: limit
    };
    }
    @Get('admin/:num')
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @ApiParam({name: 'num'})
    async getAll(@Request() {user}, @Param('num') num: number) {

        let ads = await this.model.find({adStatus: {$ne: AdStatus.timed}}).sort({ createdAt: 'desc' }).populate('category', 'id name', this.categoryModel).populate('subCategory', 'id name', this.categoryModel).limit(20).skip(num*20)
        let limit = 0
        limit = await this.model.count()
    if (!ads) throw new HttpException('not found ads', HttpStatus.NOT_FOUND);

    return {
        ads: ads, 
        limit: limit
    };
    }

    
    
    @Get('update/:id/:status')
    @ApiParam({name: 'id', })
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({description: "admin aas zar id gaar verify hiine"})
    updateStatusAd(@Request() {user} , @Param('id') id: string, @Param('status') status) {
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
        if(user.userType == 'admin' || user.userType == 'system') {

            return this.service.updateStatusAd(id, status, "", true)
        } else {
            return this.service.updateStatusAd(id, status, user['_id'], false)

        }
    }

    @Get('view/:id/:userId')
    @ApiParam({name: 'id'})
    async viewAd(@Param('id') id: string, @Param('userId') userId: string)  {
        let ad = await this.service.getAdById(id)
        if(ad.views.find(a => a.toString() == userId) == undefined && ad.user.toString() != userId) {
             await this.model.findByIdAndUpdate(ad._id, {
                $push: { views: userId },
              });
              return ad.views.length + 1
        }
    }

    @Get('search/:value')
    @ApiQuery({name: 'value'})
    @ApiOperation({description: "search ad"})
    async searchAd(@Query('value') value: string) {
        
        let ads = await this.model.find( {$text: {$search: value}, adStatus: AdStatus.created});
        let limit = 0
        limit = await this.model.count({$text: {$search: value}})
      
        if(!ads) throw new HttpException('not found', 403)
        return {ads, limit, }
    }


    @Post('many/:num/:self')
    @ApiParam({name: 'num'})
    @ApiParam({name: 'self'})
    async manyAdById( @Body() dto: [], @Param('num') num: number, @Param('self') self: string) {
        let ads = [], limit = 0
        try {
           ads = await this.model.find({$and: [{'_id' : {$in: dto}, }, self == 'true' ? {$ne: {adStatus: AdStatus.timed}} : {'adStatus': 'created'}]}).populate('category', 'id name', this.categoryModel).populate('subCategory', 'id name', this.categoryModel).limit((num+1) * 10).skip(num * 10);
           limit =  await this.model.count({$and: [{'_id' : {$in: dto}, }, self == 'true' ? {$ne: {adStatus: AdStatus.timed}} : {'adStatus': 'created'}]})
        } catch (error) {
            throw new HttpException(error, 500)
        }

        if(!ads) throw new HttpException('not found', HttpStatus.NOT_FOUND) 
        return {ads, limit}
    }
    @Cron('* * * 1 * *')
    @Get('timed')
    @ApiOperation({description: "todorhoi hugatsaa heterwel status g ni timed bolgono"})
    updateStatisTimed() {
        let ad = this.service.updateStatusTimed()
        return ad
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


    @Put('/:id')
    @ApiParam({name: 'id'})
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({description: "zar ustgah leh"})
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'images', maxCount: 20
      }]))
    async editAd(@Request() {user}, @Param('id') id: string, @Body() dto: CreateAdDto, @UploadedFiles() files: {images?: Express.Multer.File[] }) {
        try {
            if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
            console.log(dto)
            console.log(files?.images.length)
            console.log(dto.images)
            let imagesUrl = []
        for(let i = 0; i < (files?.images?.length ?? 0); i++ ){
            
            const key = `${files.images[i].originalname}${Date.now()}`
            const imageUrl = await this.s3Service.uploadFile(files.images[i], key)
            await imagesUrl.push(imageUrl)
        }
        console.log(imagesUrl)
            // let ad = await this.model.updateOne({_id: id}, dto)
            // return ad
            return
        } catch (error) {
            throw new HttpException(error, 500)
        }
    }

    @Delete('/:id')
    @ApiParam({name: 'id'})
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({description: "zar ustgah leh"})

    async deleteAdById(@Request() {user}, @Param('id') id: string) {
        try {
            let ad = await this.service.updateStatusAd(id, AdStatus.deleted, user['_id'], false)
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
