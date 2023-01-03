import {Injectable} from '@nestjs/common'
import { Ad, AdDocument } from 'src/schema';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { SuggestionDto } from './ad.dto';
@Injectable()
export class SuggestionService {
    constructor(@InjectModel(Ad.name) private model: Model<AdDocument>) {}

    async getSuggestionAds(data: SuggestionDto) {
        if(data.type == 'location') {
            let ads = await this.model.find({'position.district_id': data.suggestion})
            if(!ads) return {message: 'not found'}
            return ads
        }
        if(data.type == 'room') {
            let ads = await this.model.find({$and: [{'filters.id': '635e91e21c1c755b91c2e0a2'},{'filters.value' : data.suggestion}]})
            if(!ads) return {message: 'not found'}
            return ads
        }
    }
}