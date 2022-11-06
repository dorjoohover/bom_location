import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type, TypeDocument } from 'src/schema';
import { CreateTypeDto } from './type.dto';

@Injectable()
export class TypeService {
    constructor(@InjectModel(Type.name) private model: Model<TypeDocument>){}

    async create(dto:CreateTypeDto) {
        let type = await this.model.create({
            name: dto.name
        })
        return type
    }

    async get() {
        let type = await this.model.find()
        return type
    }
}