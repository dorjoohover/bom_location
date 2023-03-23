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

  async createAd(dto: CreateAdDto, user: any ) {
   
    let prevAd = await this.model.findOne().sort({createdAt: 'desc'})
    let adNum = 1
    if(prevAd) adNum = prevAd?.num+1
    try {
       let ad = await this.model.create({
        num: adNum ,
        images: dto.images,
        title: dto.title,
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
    const date =  Date.now()
    const deletedDate = date - (3 * 24 * 60 * 60 * 1000)
    const lateDate = date - (60 * 24 * 60 * 60 * 1000)
  
    let ads = await this.model.find({$or: [{$and: [{createdAt: {$lt: lateDate}}, {adStatus: AdStatus.created}]}, {$and: [{updatedAt: {$lt: deletedDate}},{adStatus: AdStatus.deleted} ]}]})
 
    ads.map(async (ad) => {
       return await this.updateStatusAd(ad._id, AdStatus.timed, "", true )
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
  async updateStatusAd(id: string, status: AdStatus, user: string, isAdmin : boolean ) {
    try {
      if(isAdmin) {

        let ad =  await this.model.findByIdAndUpdate(id, {
          adStatus: status,
        }) 
        return ad
      } else {
       let ad = await this.model.findOne({_id: id, user: user})
       ad.adStatus = status
       ad.save()
       return ad
      }
    } catch (error) {
      throw new HttpException('server error', 500)
    }
  }
  async getAdById(id: string) {
 
    try {
      let ad = await this.model
      .findOne({num: id}).populate('subCategory', 'id name subCategory href english filters viewFilters suggessionType isSearch', this.categoryModel).populate('user', 'phone username email profileImg userType', this.userModel)
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
      .find({$or: [{subCategory: category._id}, {category: category._id}] , adStatus: 'created'}).sort({ createdAt: 'desc' }).populate('category', 'id name', this.categoryModel).populate('subCategory', 'id name', this.categoryModel).populate('user', 'phone username email profileImg userType', this.userModel).limit((num+1) * 20).skip(num * 20);
      let limit = 0
        limit = await this.model.count({$or: [{subCategory: category._id}, {category: category._id}] , adStatus: 'created'})

    if (!ads) throw new ForbiddenException('not found ad');
    
    return {ads, limit};
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500)
    }

  }

  async getAdByFilterValue(id: string, value: string, num: number) {
    try {
      let ads = await this.model.find({$and: [{'filters.input': value}, {'filters.type': id}, {'adStatus': 'created'}]}).limit((num + 1) * 10).skip(num * 10)
      let limit = 0
      limit = await this.model.count({$and: [{'filters.input': value}, {'filters.type': id}, {'adStatus': 'created'}]})
      return {ads, limit}
    } catch (error) {
      throw new HttpException(error, 500)
    }
    
   
  }

  async getAdByFilter(filterAd: FilterAdDto,) {

      try {
        
        // 'filters': {$elemMatch: {'name': {$in: filtersValue}, 'value': {$in: filtersValue} }}, 
        let ads = await this.model.find({'types' : {$in: filterAd.adTypes}, 'subCategory': filterAd.subCategory, adStatus: 'created'}).sort({ createdAt: 'desc' });
   
   
      let filteredAds = []
      ads.forEach((ad) => {
 
        let fad  = []
        ad.filters.forEach(a => {
          let add = filterAd.filters.find((f) => {

            if(f.max != "") {
              if(f.input != '')
              return (f.type == a.type && parseInt(f.max) >= parseInt(a.input) && parseInt(a.input) >= parseInt(f.input))
            } else {
              if(f.input != '') return (f.input == a.input && f.type == a.type)
            }
          })
          if(add == undefined){
            return
          }
          fad.push(a)
        })
    
   
        if(fad.length == filterAd.filters.length)
        filteredAds.push(ad)
      })

    
      return {
        ads: filteredAds,
        limit: filteredAds.length
      }
      } catch (error) {
        throw new HttpException(error, 500)
      }
  }

}
