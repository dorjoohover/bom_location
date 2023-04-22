import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Cron } from '@nestjs/schedule/dist';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import mongoose from 'mongoose';
import { S3Service } from 'src/aws/s3.service';

import { AdStatus, AdTypes, AdView, PointSendType } from 'src/config/enum';
import { UserAccessGuard } from 'src/guard/user.guard';

import { AdDto } from './ad.dto';
import { AdService } from './ad.service';


@ApiTags('Ads')
@Controller('ad')
export class AdController {
  constructor(
    private readonly service: AdService,
    private s3Service: S3Service,
  ) {}
  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @Post('uploadFields')
  @ApiOperation({ description: 'upload images' })
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'images',
        maxCount: 20,
      },
    ]),
  )
  async uploadMultipleFiles(
    @Request() { user },
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    let imagesUrl = [];
    for (let i = 0; i < (files?.images?.length ?? 0); i++) {
      const key = `${files.images[i].originalname}${Date.now()}`;
      const imageUrl = await this.s3Service.uploadFile(files.images[i], key);
      await imagesUrl.push(imageUrl);
    }
    return imagesUrl;
  }

  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ description: 'ad create' })
  @Post()
  async ad(@Request() { user }, @Body() dto: AdDto) {
    if (!user) throw new HttpException('UNAUTHORIZATION_ERROR', 403);

      switch (dto.adType) {
        case 'sharing': {
          dto.adStatus = AdStatus.checking;
          return this.service.createAd(dto, user['_id']);
        }
        case 'poster':
          return {
            message: 'soon',
            status: false,
          };
        case 'special': {
          if (user.point >= 10000) {
            return this.service.createAd(dto, user['_id']);
          } else {
            return {
              message: 'not enough Eunit',
            };
          }
        }
        default:
          return this.service.createAd(dto, user['_id']);
      }
    
  }

  @Get(':num')
  // @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiOperation({ description: 'buh zariig harna' })
  @ApiParam({ name: 'num' })
  getAllAds(@Param('num') num: number) {
    let defaultAds = this.service.getAds(num, 10, true, AdTypes.default, false)
    let specialAds = this.service.getAds(num , 4, true, AdTypes.special, true)
    return {
      defaultAds: {
        ads: defaultAds,
        limit: 10
      },
      specialAds: {
        ads: specialAds,
        limit: 4
      }
    }
  }

  @Get('admin/:type/:num')
  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'num' })
  @ApiParam({ name: 'type' })
   getAll(@Request() { user },     @Param('type') type,
  @Param('num') num: number,) {
    if (user.userType == 'admin' || user.userType == 'system') {
     let ads = this.service.getAds(num, 20, false, AdTypes.sharing, true)
     if (!ads) throw new HttpException('not found ads', 402);
      // let {
      //   apartmentJson,
      //   officeJson,
      //   factoryJson,
      //   garageJson,
      //   landJson,
      //   serviceJson,
      // } = getJson(ads);
      // return {
      //   apartment: apartmentJson,
      //   office: officeJson,
      //   factory: factoryJson,
      //   garage: garageJson,
      //   land: landJson,
      //   service: serviceJson,
      // };
      
    }
    return false;
  }

  @Get('update/:id/:status/:view/:message')
  @UseGuards(UserAccessGuard)
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'status' })
  @ApiParam({ name: 'view' })
  @ApiQuery({ name: 'message' })
  @ApiBearerAuth('access-token')
  @ApiOperation({ description: 'change ad status' })
  updateStatusAd(
    @Request() { user },
    @Query('message') message,
    @Param('id') id,
    @Param('view') view,
    @Param('status') status,
  ) {
    if (!user) throw new HttpException('UNAUTHORIZATION_ERROR', 403);

      return this.service.updateStatusAd(
        id,
        status,
        view ,
        user['_id'],
        user.userType == 'admin' || user.userType == 'system',
        message,
      );
    
  }

  @Get('view/:id/:userId')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'userId' })
  @ApiOperation({ description: 'add ad views' })
   viewAd(@Param('id') id: string, @Param('userId') userId: string) {
    return this.service.addAdView(id, userId)
  }

  @Get('search/:value')
  @ApiQuery({ name: 'value' })
  @ApiOperation({ description: 'search ad' })
  async searchAd(@Query('value') value: string) {
   return this.service.searchAd(value)
  }

  @Post('many/:num/:self')
  @ApiParam({ name: 'num' })
  @ApiParam({ name: 'self' })
  @ApiOperation({ description: 'images by multi ids' })
  async manyAdById(
    @Body() dto: [],
    @Param('num') num: number,
    @Param('self') self: string,
  ) {
    if(self == 'true') {
      return this.service.getManyAds(dto, num, AdView.end, true)
    } else {
      return this.service.getManyAds(dto, num , AdView.show, false)
    }
  }

  @Cron('* * * 1 * *')
  @Get('timed')
  @ApiOperation({
    description: 'todorhoi hugatsaa heterwel status g ni timed bolgono',
  })
  updateStatusTimed() {
   return this.service.updateStatusTimed()

  }

  @Get('adType/:id/:message')
  @ApiParam({ name: 'id' })
  @ApiQuery({ name: 'message' })
  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ description: 'change ad type' })
  async updateAdTypeSpecial(
    @Request() { user },
    @Param('id') id: string,
    @Query('message') message,
  ) {
    try {
      if (user.point >= 10000) {
        let receiver = new mongoose.mongo.ObjectId('641fc3b3bc1f3f56080e1f83');
        let res = await this.service.updateTypeAd(id, AdTypes.special, true);
        if (res) {
          user.point = Number.parseFloat(user.point.toString()) - 10000;
          user.pointHistory.push({
            point: 10000,
            sender: user['_id'],
            receiver: receiver,
            type: PointSendType.sender,
            message: message ?? '',
          });
          user.save();
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @ApiParam({ name: 'id' })
  @ApiOperation({ description: 'zar g category id gaar awna' })
  @Get('category/:id/:num')
  getAdByCategoryId(@Param('id') id: string, @Param('num') num: number) {
    return this.service.getAdByCategoryId(id, num);
  }

  @ApiOperation({ description: 'filter ad' })
  @Post('filter')
  getFilterAd(@Body() filterAd: any) {
    // return this.service.getAdByFilter(filterAd);
    return
  }

  @ApiOperation({ description: 'filter and suggest ad by value ' })
  @Get('filter/:cateId/:id/:value/:num')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'num' })
  @ApiParam({ name: 'value' })
  getFilterByValueAd(
    @Param('cateId') cateId: string,
    @Param('id') id: string,
    @Param('value') value: string,
    @Param('num') num: number,
  ) {
    // let input = Buffer.from(value, 'utf-8').toString();
    // return this.service.getAdByFilterValue(cateId, id, input, num);
    return
  }

  @ApiOperation({ description: 'suggest ad by enum' })
  @Get('suggestion/:id/:type/:value/:num')
  getSuggestion(
    @Param('type') type: string,
    @Param('value') value: string,
    @Param('id') id: string,
    num: number,
  ) {
    // let input = Buffer.from(value, 'utf-8').toString();
    // return this.service.getAdByFilterValue(id, type, input, num);
    return
  }

  @Get('id/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ description: 'zariig id gaar ni awna' })
  getAdById(@Param('id') id: string) {
    return this.service.getAdById(id);
  }

  @Put('/:id')
  @ApiParam({ name: 'id' })
  @UseGuards(UserAccessGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ description: 'edit ad' })
  async editAd(
    @Request() { user },
    @Param('id') id: string,
    @Body() dto: AdDto,
  ) {
    if (!user) throw new HttpException('UNAUTHORIZATION_ERROR', 403);
    
    return this.service.updateAd(id, dto)
  }

  @Delete()
  @ApiOperation({ description: 'delete all ads' })
  deleteAds() {
    return this.service.delete();
  }
}
