import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdType, AdTypeDocument } from "src/schema";
import { CreateAdTypeDto } from "./ad_type.dto";

@Injectable()
export class AdTypeService {
    constructor(@InjectModel(AdType.name) private readonly model: Model<AdTypeDocument>) {}
    async create(dto: CreateAdTypeDto) {
        let type = await this.model.findOne({name: dto.name})
        if(type)
        throw new ForbiddenException('found')
        type = await this.model.create({
            name: dto.name
        })
        return type
    }

    async getAllData() {
        let data = await this.model.find()
        if(!data)
        throw new ForbiddenException('not found')
        
        return data
    }

    async getDataById(id:string) {
        let type = await this.model.findById(id)
        if(!type)
        throw new ForbiddenException('not found that id')
        
        return type
    }
}