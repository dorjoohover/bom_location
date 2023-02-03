import { Body, Controller, Delete, Get, HttpException, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
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
// @UseGuards(UserAccessGuard)
// @ApiBearerAuth("access-token")
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
        // for(let i = 0; i < files.images.length / 2; i++ ){
        //     // fieldname shalgah
        //     const key = `${files.images[i].fieldname}${Date.now()}`
        //     const imageUrl = await this.s3Service.uploadFile(files.images[i], key)
        //     await imagesUrl.push(imageUrl)
        // }
        dto.positions = JSON.parse(dto.positions)
        dto.filters = JSON.parse(dto.filters)
        dto.location = JSON.parse(dto.location)
       
        return this.service.createAd(dto, user,  imagesUrl)
        
    }
    

    @Get()
    // @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiOperation({description: "buh zariig harna"})
    getAllAds() {
        return this.service.getAllAds()
    }

    
   

    
   
    @Get('notVerify')
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

    @Get('delete/:id')
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "admin aas zar id gaar delete hiine"})
    deleteAd(@Query('id') id) {
        return this.service.deleteAd(id)
    }

    @Get('sold/:id')
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "zariig ig gaar ni status iig ni sold bolgono"})
    soldAd(@Query('id') id) {
        return this.service.updateStatusAd(id, AdStatus.sold)
    }


    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @Post('user')
    @ApiOperation({description: "zariig user id gaar ni awna"})
    adByUser( @Request() {user}) {
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403);
        console.log(user, user._id)
        let ads = this.service.getAdsByUserId(user._id)
        return ads
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
    @Get('/:id')
    @ApiQuery({name: 'id', })
    @ApiOperation({description: "zariig id gaar ni awna"})
    getAdById(@Query('id') id) {
        return this.service.getAdById(id)
    }
    @Delete()
    async deleteAds() 
    {
        return await this.model.deleteMany()
    }
    
}
