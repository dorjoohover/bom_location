import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Committee, CommitteeDocument, Discrict, DistrictDocument,Location,  LocationDocument, Position, PositionDocument, Town, TownDocument } from 'src/schema';
import { CreatePostionDto } from './position.dto';

@Injectable()
export class PositionService {
    constructor (
        @InjectModel(Position.name) private model: Model<PositionDocument>,
        @InjectModel(Discrict.name) private discrictModel: Model<DistrictDocument>,
        @InjectModel(Committee.name) private committeeModel: Model<CommitteeDocument>,
        @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
        @InjectModel(Town.name) private townModel: Model<TownDocument>,
        ) {}

    async createPosition(dto: CreatePostionDto) {
        let position = await this.model.create({
            district: dto.district,
            committee: dto.committee,
            location: dto.location,
            town: dto.town
        })

        return position
    }

    async getDiscrictById(id: string) {
        let discrict = await this.discrictModel.findById(id)

        if(!discrict)
        throw new ForbiddenException('not found')

        return discrict
    }

    async getCommitteeByid(id: string) {
        let committee = await this.committeeModel.find().where('district_id').equals(id)

        if(!committee)
        throw new ForbiddenException('not found')

        return committee
    }

    async getAllPositions() {
        let positions = await this.model.find()

        if(!positions)
        throw new ForbiddenException('not found')
        return positions
    }

    async getPositionById(id:string) {
        let position = await this.model.findById(id)

        if(!position)
        throw new ForbiddenException('not found')

        return position
    }
}
