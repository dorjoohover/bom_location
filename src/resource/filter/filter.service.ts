import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Filter, FilterDocument } from 'src/schema';
import { CreateFilterDto } from './filter.dto';

@Injectable()
export class FilterService {
    constructor(@InjectModel(Filter.name) private model: Model<FilterDocument>) {}

    async createFilter(dto: CreateFilterDto) {
        let filter = await this.model.findOne({name: dto.name})
        if(filter)
        throw new ForbiddenException('found')
        filter = await this.model.create({
            name: dto.name,
            choices: dto.choices
        })
        return filter
    }

    async getAllFilters() {
        let filters = await this.model.find()
        if(!filters)
        throw new ForbiddenException('not found')

        return filters
    }

    async getFilterById(id: string) {
        let filter = await this.model.findById(id)
        if(!filter)
        throw new ForbiddenException('not found')
        return filter
    }
}
