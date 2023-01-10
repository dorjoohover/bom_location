import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Ad,
  AdDocument,
  Filter,
  FilterDocument,
  Location,
  Committee,
  CommitteeDocument,
  LocationDocument,
  Discrict,
  DistrictDocument,
  Town,
  TownDocument,
  User,
  CategoryDocument,
  Category,
} from 'src/schema';
import { CreateAdDto, FilterAdDto, FilterDto } from './ad.dto';

import toStream = require('buffer-to-stream');
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Filters, getFilter } from '../category/interface/categoryEnum';

@Injectable()
export class AdService {
  constructor(
    @InjectModel(Ad.name) private model: Model<AdDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    
  ) {}
  // async uploadImage(file: Express.Multer.File) {
  //   const promise = await new Promise((resolve, reject) => {
  //     const upload = v2.uploader.upload_stream((error, result) => {
  //       if (error) return reject(error);
  //       resolve(result);
  //     });

  //     toStream(file.buffer).pipe(upload);
  //   }).then((r) => r['secure_url']);
  //   return promise;
  // }
  async createAd(dto: CreateAdDto,  user: any) {
    
 
    let ad = await this.model.create({
      images: dto.images,
      image: dto.images[0],
      title: dto.title,
      positions: dto.positions,
      description: dto.description,
      location: dto.location,
      types: dto.types,
      subCategory: dto.subCategory,
      filters: dto.filters,
      user: user['_id'],
      category: dto.category
    });



    return ad;
  }

  async getAllAds() {
    let ads = await this.model.find().sort({ createdAt: 'desc' });
    if (!ads) throw new ForbiddenException('not found ads');
    return ads;
  }

  async getAdById(id: string) {
 
    let ad = await this.model
      .findById(id)
      if (!ad) throw new ForbiddenException('not found ad');
   
    return ad;
  }
  
  async getAdByCategoryId(id: string) {
    let ad = await this.model
      .find({subCategory: id})
      
    if (!ad) throw new ForbiddenException('not found ad');
    
   
    return ad;

  }

  async getAdByFilter(filterAd: FilterAdDto) {

      let ads = await this.model.find({'types' : {$in: filterAd.adTypes}, 'positions.district_id': filterAd.positions.district_id,'positions.location_id' : filterAd.positions.location_id, 'subCategory': filterAd.subCategory})
      ads.map((ad) => {
        ad.filters.map((f) => {
          filterAd.filters.filter((fa) => {
            if(fa.maxValue) {
              fa.name == f.name && fa.maxValue >= f.value && fa.value <= f.value
            } else {
              fa.name == f.name && fa.value == f.value
            }
          })
        })
      })
      
      return ads
      // ,
      // 
      //
  }
}
