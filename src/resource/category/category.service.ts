import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import {
  Category,
  CategoryDocument,
  Item,
  ItemDocument
} from 'src/schema';
import {
  CreateCategoryDto,
  CreateSubCategory,
  UpdateCategoryDto
} from './category.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private model: Model<CategoryDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    let category = await this.model.findOne({ name: dto.name });
    if (category) throw new ForbiddenException('found that category');

    try {
      category = await this.model.create({
        name: dto.name,
        isParent: dto.isParent,
        href: dto.href,
        english: dto.english
      });
      return category;
    } catch (error) {
      throw new HttpException('server error', 500)
    }
  }

  async createSubCategory(dto: CreateSubCategory) {
    try {
      let subCategory = await this.model.findOne({ name: dto.name });
      if (subCategory) throw new HttpException('found', HttpStatus.FOUND);
      subCategory = await this.model.create({
        name: dto.name,
        href: dto.href,
        english: dto.english,
        isParent: dto.isParent,
        filters: dto.filters,
        steps: dto.steps,
        suggessionType: dto.suggestionType,
      });
      let category = await this.model.findByIdAndUpdate(dto.id, {
        $push: { subCategory: subCategory._id },
      });

      return subCategory;
    } catch (e) {
      throw new HttpException(e, 500)
    }
  }
  async getAllCategories() {
    try {
      let categories = await this.model
      .find()
      .where('isParent')
      .equals(true)
      .populate(
        'subCategory',
        'id name subCategory filters  href english viewFilters',
        this.model,
      )
      .exec();
    if (!categories) throw new ForbiddenException('not found');

    return  categories;
    } catch (error) {
      throw new HttpException('server error', 500)
    }
  }

  async getCategoryById(id: string) {
    try {
      let category
    if(mongoose.Types.ObjectId.isValid(id))
    {
      category = await this.model
      .findById(id)
      .populate(
        'subCategory',
        'id name subCategory href english steps filters viewFilters suggessionType',
        this.model,
      )
      .exec();
    } else {
      category = await this.model
      .findOne({href: id})
      .populate(
        'subCategory',
        'id name subCategory href english steps filters viewFilters',
        this.model,
      )
      .exec();
    }
    return category;  
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
  
  async getSubCategoryFiltersById(id: string, isFilter: string) {
    
    try {
      let subCategory 
    if(mongoose.Types.ObjectId.isValid(id))  {
      subCategory = await this.model.findById(id).populate(isFilter == 'true' ? 'filters' : 'steps.values', 'name value types type input max parentId other isSearch', this.itemModel).populate('subCategory', 'name english href' ,this.model).exec();
    } else {
      subCategory = await this.model.findOne({href: id}).populate(isFilter == 'true' ? 'filters' : 'steps.values', 'name value types type input max parentId other isSearch', this.itemModel).populate('subCategory', 'name english href' ,this.model).exec();
    }
    if (!subCategory)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);

  
    return subCategory;
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  async updateCategoryById(id: string, dto: UpdateCategoryDto) {

   
    try {
     await this.model.findByIdAndUpdate(id, {
        name: dto.name,
          href: dto.href,
          english: dto.english,
          isParent: dto.isParent,
          filters: dto.filters,
          steps: dto.steps,
          suggessionType: dto.suggestionType,
      })
      return true
    } catch (error) {
      throw new HttpException(error.message, 500)
    } 
  }

  // async deleteAllCategory() {
  //   let category = this.model.deleteMany().then((d) => console.log(d));
  //   return category;
  // }
}
