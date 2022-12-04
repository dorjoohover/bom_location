import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad, AdDocument, Filter, FilterDocument, Location,Committee, CommitteeDocument, LocationDocument, Discrict, DistrictDocument, Town, TownDocument } from 'src/schema';
import { CreateAdDto,  FilterDto } from './ad.dto';
const cloudinary  = require('cloudinary').v2
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

    async createAd(dto: CreateAdDto, file:  Express.Multer.File) {
        cloudinary.config({ 
            cloud_name: 'dosvc4rce', 
            api_key: '418226341632639', 
            api_secret: 'RnQ2lcc8SA_UyM8jsq1VVOjfkiM' 
          });
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          };

            const result = await cloudinary.uploader.upload(file, options);

        let ad = await this.model.create({
            image: result.secure_url,
            title: dto.title,
            description: dto.description,
            positions: dto.positions,
            location: dto.location,
            subCategory: dto.subCategory,
            filters: dto.filters,
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
