import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from 'src/schema';
import { LocationDto } from './location.dto';

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private model: Model<LocationDocument>){}
    async create(dto: LocationDto) {
        let location = await this.model.findOne({name: dto.name})
        if(location) {
            throw new ForbiddenException('founded that location')
        }
        location = await this.model.create({
            name: dto.name,
            district_id: dto.district_id,
            zipcode: dto.zipcode,
            latitude: dto.lantitude,
            longitude: dto.longitude
        })
        return location
    }

    async get() {
        let location = await this.model.find()
        if(!location)
        throw new ForbiddenException('not found')
        
        return location 
    }

    async getByDiscrict(id:string) {
        let location = await this.model.find().where('district_id').equals(id)
        if(!location)
        throw new ForbiddenException('not found')
        return location
        
    }
}
