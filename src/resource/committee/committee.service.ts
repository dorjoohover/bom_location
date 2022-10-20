import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Committee, CommitteeDocument } from 'src/schema/committee.schema';
import { CommitteeDto } from './committee.dto';

@Injectable()
export class CommitteeService {
    constructor(@InjectModel(Committee.name) private model: Model<CommitteeDocument>) {}

    async create(dto:CommitteeDto) {
        let committee = await this.model.findOne({name: dto.name})

        if(committee) {
            throw new ForbiddenException('founded that committee')
        }

        committee = await this.model.create({
            name: dto.name, 
            zipcode: dto.zipcode,
            district_id: dto.discrict_id
        })
        return committee
    }
}
