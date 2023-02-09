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
        types: dto.types
      });
      await this.userModel.findByIdAndUpdate(user['_id'], {
        $push: {ads: ad._id}
      })
    } catch (error) {
      throw new HttpException('Server error', 500)
    }
    return true;
  }

  async getAllAds() {
    let ads = await this.model.find({adStatus: 'created'}).sort({ createdAt: 'desc' });
    if (!ads) throw new ForbiddenException('not found ads');
    return ads;
  }
  
  async getAdNotVerified() {
    let ads = await this.model.find({adStatus: 'pending'}).sort({ createdAt: 'desc' });
    if (!ads) throw new ForbiddenException('not found ads');
    return ads;
  }

  async verifyAd(id: string) {
    let ad = await this.model.findByIdAndUpdate(id, {
      adStatus: AdStatus.created
    })
    return ad
  }
  async deleteAd(id: string) {
    let ad = await this.model.findByIdAndUpdate(id, {
      adStatus: AdStatus.deleted
    })
    return ad
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
    return await this.model.find({
      user: id,
      adStatus: 'created'
    })
  }
  async updateStatusAd(id: string, status: AdStatus) {
    let ad = await this.model.findByIdAndUpdate(id, {
      adStatus: status
    })
    return ad
  }
  async getAdById(id: string) {
 
    let ad = await this.model
      .findOne({num: id}).populate('subCategory', 'id name subCategory href english filters viewFilters suggessionType', this.categoryModel)
      if (!ad) throw new ForbiddenException('not found ad');
    return ad;
  }
  
  async getAdByCategoryId(id: string) {
    console.log(id)
    let category = await this.categoryService.getCategoryById(id)
    let ad = await this.model
      .find({subCategory: category._id, adStatus: 'created'})
      
    if (!ad) throw new ForbiddenException('not found ad');
    
   
    return ad;

  }

  async getAdByFilter(filterAd: FilterAdDto) {

      let ads = await this.model.find({'types' : {$in: filterAd.adTypes}, 'positions.district_id': filterAd.positions.district_id != '' ? filterAd.positions.district_id : {$ne: ''},'positions.location_id' : filterAd.positions.location_id != '' ? filterAd.positions.location_id : {$ne: ''}, 'subCategory': filterAd.subCategory, adStatus: 'created'})
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
  }
}
