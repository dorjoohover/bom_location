import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad, AdDocument, Filter, FilterDocument } from 'src/schema';
import { CreateAdDto } from './ad.dto';

@Injectable()
export class AdService {
    constructor (@InjectModel(Ad.name) private model: Model<AdDocument>, @InjectModel(Filter.name) private filterModel: Model<FilterDocument>) {}

    async createAd(dto: CreateAdDto) {
        let ad = await this.model.create({
            title: dto.title,
            description: dto.description,
            positions: dto.positions,
            location: dto.location,
            subCategory: dto.subCategory,
            filters: dto.filters
        })
        return ad
    }

    async getAllAds() {
        let ads = await this.model.find()
        if(!ads) throw new ForbiddenException('not found ads')
        return ads
    }

    async getAdById(id:string) {
        let ad = await this.model.findById(id).populate('filters.id', 'name', this.filterModel)
        if(!ad) throw new ForbiddenException('not found ad')
        return ad
    }
}
