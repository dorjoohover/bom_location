import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discrict, DistrictDocument } from 'src/schema';
import { DiscrictDto } from './district.dto';

@Injectable()
export class DistrictService {
    constructor(@InjectModel(Discrict.name) private model: Model<DistrictDocument>){}
    async create( dto: DiscrictDto) {
        let discrict = await this.model.findOne({name: dto.name})
        if(discrict ) {
            throw new ForbiddenException ('founded that district')
        }
        discrict = await this.model.create({
            name: dto.name,
            zipcode: dto.zipcode,
            latitude: dto.latitude,
            longtitude: dto.longitude,
            zone_id: dto.zone_id
        })
        return discrict 
    }

    async getData() {
        let discrict = await this.model.find()
        if(!discrict ) {
            throw new ForbiddenException ('found that district')
        }

        return discrict
    }
}
