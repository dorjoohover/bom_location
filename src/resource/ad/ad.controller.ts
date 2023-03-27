import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';

import { InjectModel } from '@nestjs/mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Cron } from '@nestjs/schedule/dist';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import mongoose, { Model } from 'mongoose';

import { AdStatus, AdTypes, PointSendType } from 'src/config/enum';
import { UserAccessGuard } from 'src/guard/user.guard';
import { Ad, AdDocument, Category, CategoryDocument, User, UserDocument } from 'src/schema';
import { CreateAdDto, FilterAdDto } from './ad.dto';
import { AdService } from './ad.service';
import { S3Service } from './s3.service';
import { SuggestionService } from './suggestion.service';

@ApiTags('Ads')
@Controller('ad')

export class AdController {
    constructor(private readonly service:AdService, private suggestionService: SuggestionService, @InjectModel(Ad.name) private model: Model<AdDocument>, private s3Service: S3Service, @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>),@InjectModel(User.name) private userModel: Model<UserDocument> {

    }
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @Post('uploadFields')
    @ApiOperation({description: "zar create leh"})
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'images', maxCount: 20
      }]))
  async uploadMultipleFiles(@Request() {user} , @UploadedFiles() files: {images?: Express.Multer.File[] }) {
      let imagesUrl = []
    for(let i = 0; i < (files?.images?.length ?? 0); i++ ){
        const key = `${files.images[i].originalname}${Date.now()}`
        const imageUrl = await this.s3Service.uploadFile(files.images[i], key)
        await imagesUrl.push(imageUrl)
    }
    return imagesUrl
  }

       
        
    
    
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @Post()

    async createAd( @Request() {user}, @Body() dto: CreateAdDto,) {
        
        // return dto
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);


        dto.filters = JSON.parse(dto.filters)
        if(dto.location)
        dto.location = JSON.parse(dto.location)
        if(dto.images) 
        {
            let image = dto.images.split(',')
            dto.images = image
        }
        return this.service.createAd(dto, user)
        
    }
    

    @Get(':num')
    // @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiOperation({description: "buh zariig harna"})
    @ApiParam({name: 'num'})
    async getAllAds(@Param('num') num: number) {

        let ads = await this.model.find({adStatus: 'created'}).populate('user', 'id phone email username profileImg', this.userModel).populate('category', 'id name', this.categoryModel).populate('subCategory', 'id name', this.categoryModel).limit(10).skip(num*10)
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

    @Get('adType/:id')
    @ApiParam({name: 'id', })
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    async updateAdTypeSpecial(@Request() {user}, @Param('id') id: string, ) {
        try {
            if(user.point >= 10000) {
                let receiver = new mongoose.mongo.ObjectId('641fc3b3bc1f3f56080e1f83')
                let res = await this.service.updateTypeAd(id, AdTypes.special, true)
                if(res) {

                    user.point = Number.parseFloat(user.point.toString()) - 10000
                    user.pointHistory.push({
                        point: 10000,
                        sender: user['_id'],
                        receiver: receiver,
                        type: PointSendType.sender
                    })
                    user.save()
                    return true
                } else {
                    return false
                }
                
            }
        } catch (error) {
            throw new HttpException(error, 500)
        }
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
    @Get('filter/:cateId/:id/:value/:num')
    @ApiParam({name: 'id'})
    @ApiParam({name: 'num'})
    @ApiParam({name: 'value'})
    getFilterByValueAd(@Param('cateId') cateId: string, @Param('id') id: string, @Param('value') value: string, @Param('num') num: number) {
        let input = Buffer.from(value, 'utf-8').toString()
        return this.service.getAdByFilterValue(cateId, id, input, num)

    }
    @ApiOperation({description: "suggest zar enum aar awah  "})
    @Get('suggesstion/:id/:type/:value/:num')

    getSuggestion(@Param('type') type: string, @Param('value') value: string, @Param('id') id: string,  num: number) {
        let input = Buffer.from(value, 'utf-8').toString()
        return this.service.getAdByFilterValue(id, type, input, num)
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
    async editAd(@Request() {user}, @Param('id') id: string, @Body() dto: CreateAdDto) {
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
            console.log(dto)
            console.log(id)
            dto.filters = JSON.parse(dto.filters)
            if(dto.location) {

                dto.location = JSON.parse(dto.location)
            }
            if(dto.images) 
            {
                let image = dto.images.split(',')

                dto.images = image
            }
            let ad = await this.model.findById(id)

            try {
            ad.filters = dto.filters
            ad.location = dto.location
            ad.images = dto.images
            ad.title = dto.title
            ad.description = dto.description,
            ad.adType = dto.adTypes
            ad.adStatus = AdStatus.pending
            await ad.save()
            return ad
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
    @Delete()
    async deleteAds() 
    {
        return await this.model.deleteMany()
    }
    
}
