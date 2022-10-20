import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Zone, ZoneDocument } from 'src/schema';
import { ZoneDto } from './zone.dto';

@Injectable()
export class ZoneService {
    constructor(@InjectModel(Zone.name) private model: Model<ZoneDocument>) {}

    async create(dto:ZoneDto) {
        let zone = await this.model.findOne({name:dto.name})
        if(zone) {
            throw new ForbiddenException('founded that zone')
        }
        zone = await this.model.create({
            name: dto.name
        })
        return zone
    }
}
