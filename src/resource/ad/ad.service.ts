import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad, AdDocument, Filter, FilterDocument, Location,Committee, CommitteeDocument, LocationDocument, Discrict, DistrictDocument, Town, TownDocument } from 'src/schema';
import { CreateAdDto,  FilterDto } from './ad.dto';

import toStream = require('buffer-to-stream');
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';


@Injectable()
export class AdService {
    constructor (
        @InjectModel(Ad.name) private model: Model<AdDocument>,
         @InjectModel(Filter.name) private filterModel: Model<FilterDocument>,
         @InjectModel(Discrict.name) private disrtictModel: Model<DistrictDocument>,
         @InjectModel(Committee.name) private committeeModel: Model<CommitteeDocument>,
         @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
         @InjectModel(Town.name) private townModel: Model<TownDocument>,
         ) {}
    async uploadImage(file: Express.Multer.File) {

        const promise = await new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((error, result) => {
              if (error) return reject(error);
              resolve(result);
            });
          
            toStream(file.buffer).pipe(upload);
          }).then(r => r['secure_url'])
          return promise
    }
    async createAd(dto: CreateAdDto, file) {

        let img = await this.uploadImage(file)



        let ad = await this.model.create({
            image: img,
            title: dto.title,
            description: dto.description,
            positions: JSON.parse(`${dto.positions}`),
            location: dto.location,
            subCategory: dto.subCategory,
            filters: JSON.parse(`${dto.filters}`),
        })

        return ad
    }

    async getAllAds() {
        let ads = await this.model.find().sort({'createdAt': 'desc'})
        if(!ads) throw new ForbiddenException('not found ads')
        return ads
    }



    async getAdById(id:string) {
        let ad = await this.model.findById(id).populate('filters.id', 'name type', this.filterModel).populate('positions.district_id', 'name', this.disrtictModel).populate('positions.location_id', 'name', this.locationModel)
        if(!ad) throw new ForbiddenException('not found ad')
       
        return ad
    }

    
    async getAdByFilter(filterAd: FilterDto) {


        let ad = await this.model.find({$and: [{'filters.id': filterAd.id, $or: [{'filters.value': {$gte: filterAd.minValue, $lte: filterAd.maxValue}}, {'filters.value': filterAd.value}]}]})
        return ad

    
    }
}
