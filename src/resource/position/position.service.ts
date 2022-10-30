import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position, PositionDocument } from 'src/schema';
import { CreatePostionDto } from './position.dto';

@Injectable()
export class PositionService {
    constructor (@InjectModel(Position.name) private model: Model<PositionDocument>) {}

    async createPosition(dto: CreatePostionDto) {
        let position = await this.model.create({
            district: dto.district,
            committee: dto.committee,
            location: dto.location,
            town: dto.town
        })

        return position
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
