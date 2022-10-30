import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Town, TownDocument } from 'src/schema';
import { CreateTownDto } from './town.dto';

@Injectable()
export class TownService {
    constructor(@InjectModel(Town.name) private model: Model<TownDocument>) {}

    async createTown(dto: CreateTownDto) {
        let town = await this.model.findOne({name: dto.name})
        if(town)
        throw new ForbiddenException('found')

        town = await this.model.create({
            name: dto.name,
            location: dto.location
        })
        return town
    }

    async getAllTowns() {
        let towns = await this.model.find()
        if(!towns)
        throw new ForbiddenException('not found')
        return towns
    }

    async getTownById(id: string) {
        let town = await this.model.findById(id)
        if(!town)
        throw new ForbiddenException('not found')
        return town
    }
}
