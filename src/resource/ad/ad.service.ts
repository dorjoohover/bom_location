import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdStatus } from 'src/config/enum';
import {
  Ad,
  AdDocument, Category, CategoryDocument, User, UserDocument
} from 'src/schema';
import { CategoryService } from '../category/category.service';
import { CreateAdDto, FilterAdDto } from './ad.dto';


@Injectable()
export class AdService {
  constructor(
    @InjectModel(Ad.name) private model: Model<AdDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private categoryService: CategoryService
  ) {}

  async createAd(dto: CreateAdDto, user: any ,  images: any) {
   
    let prevAd = await this.model.findOne().sort({createdAt: 'desc'})
    let adNum = 1
    if(prevAd) adNum = prevAd?.num+1
  
    try {
       let ad = await this.model.create({
        num: adNum ,
        images: images,
        title: dto.title,
        positions:dto.positions,
        description: dto.description,
        location: dto.location,
        subCategory: dto.subCategory,
        filters: dto.filters,
        user: user['_id'],
        category: dto.category,
        adStatus: dto.adStatus,
        adType: dto.adTypes,
        types: dto.types
      });
      await this.userModel.findByIdAndUpdate(user['_id'], {
        $push: {ads: ad._id}
      })
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500)
    }
    return true;
  }


  async updateStatusTimed() {
    const date = Number(Date.now())
    const lateDate = new Date(date - 60)
    let ads = await this.model.find({createdAt: {$lt: lateDate}})
    ads.map(async (ad) => {
      return await this.updateStatusAd(ad._id, AdStatus.timed )
    })
    return ads
  }

  async getAdsByUserId(id: string) {
    try {
      let ads = await this.model.find({
        user: id,
        adStatus: 'created'
      }).sort({ createdAt: 'desc' });
      return {ads}
    } catch (error) {
      throw new HttpException('server error', 500)
    }
  }
  async updateStatusAd(id: string, status: AdStatus) {
    try {
      let ad = await this.model.findByIdAndUpdate(id, {
        adStatus: status
      })
      return ad
    } catch (error) {
      throw new HttpException('server error', 500)
    }
  }
  async getAdById(id: string) {
 
    try {
      let ad = await this.model
      .findOne({num: id}).populate('subCategory', 'id name subCategory href english filters viewFilters suggessionType', this.categoryModel)
      if (!ad) throw new ForbiddenException('not found ad');
    return ad;
    } catch (error) {
      throw new HttpException('server error', 500)
    }
  }
  
  async getAdByCategoryId(id: string, num: number) {

    try {
      let category = await this.categoryService.getCategoryById(id)
    let ads = await this.model
      .find({$or: [{subCategory: category._id}, {category: category._id}] , adStatus: 'created'}).sort({ createdAt: 'desc' }).limit((num+1) * 20).skip(num * 20);
      let limit = 0
        limit = await this.model.count({$or: [{subCategory: category._id}, {category: category._id}] , adStatus: 'created'})

    if (!ads) throw new ForbiddenException('not found ad');
    
    return {ads, limit};
    } catch (error) {
      throw new HttpException('server error', 500)
    }

  }

  async getAdByFilterValue(id: string, value: string, num: number) {
    try {
      let ads = await this.model.find({$and: [{'filters.value': value}, {'filters.id': id}]}).limit((num + 1) * 10).skip(num * 10)
      let limit = 0
      limit = await this.model.count({$and: [{'filters.value': value}, {'filters.id': id}]})
      return {ads, limit}
    } catch (error) {
      throw new HttpException(error, 500)
    }
    
   
  }

  async getAdByFilter(filterAd: FilterAdDto) {

      try {
        let ads = await this.model.find({'types' : {$in: filterAd.adTypes}, 'positions.district_id': filterAd.positions.district_id != '' ? filterAd.positions.district_id : {$ne: ''},'positions.location_id' : filterAd.positions.location_id != '' ? filterAd.positions.location_id : {$ne: ''}, 'subCategory': filterAd.subCategory, adStatus: 'created'}).sort({ createdAt: 'desc' });
      ads.map((ad) => {
        ad.filters.map((f) => {
          filterAd.filters.filter((fa) => {
            if(fa.maxValue) {
              fa.name == f.name && fa.maxValue >= parseInt(f.value) && parseInt(fa.value) <= parseInt(f.value)
            } else {
              if(fa.value != '' ) {
                fa.name == f.name && fa.value == f.value
              }
            }
          })
        })
      })
      
      return ads
      } catch (error) {
        throw new HttpException('server error', 500)
      }
  }
}
