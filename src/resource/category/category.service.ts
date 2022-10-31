import {ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdType, AdTypeDocument, Category, CategoryDocument, CategorySchema, Filter, FilterDocument } from 'src/schema';
import { createCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>, @InjectModel(Filter.name) private filterModel: Model<FilterDocument>, @InjectModel(AdType.name) private typeModel: Model<AdTypeDocument>) {}

    async createCategory(dto: createCategoryDto) {
        let category = await this.model.findOne({name: dto.name})
        if(category)
        throw new ForbiddenException('founded that category')

        category = await this.model.create({
            name: dto.name,
            parentId: dto.parentId,
            filters: dto.filters,
            types: dto.types
        })
        return category
    }

    async getAllCategories() {
        let categories = await this.model.find().where('parentId').equals(null)
        if(!categories)
        throw new ForbiddenException('not found')

        return categories
    }

    async getCategoryById(id: string) {
        let category = await this.model.find().where('parentId').equals(id).populate('parentId', "name", this.model).populate('filters',"name choices",  this.filterModel).populate('types', 'name', this.typeModel).exec()
        if(!category)
        throw new ForbiddenException('not found')
        return category
    }
    
}
