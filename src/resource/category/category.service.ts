import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { getStep } from 'src/config/enum';

import {
  Category,
  CategoryDocument, Discrict,
  DistrictDocument,
  Location, LocationDocument
} from 'src/schema';
import {
  CreateCategoryDto,
  CreateSubCategory,
  UpdateCategoryDto
} from './category.dto';
import { Filters, getFilter } from './interface/categoryEnum';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private model: Model<CategoryDocument>,
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    @InjectModel(Discrict.name) private districtModel: Model<DistrictDocument>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    let category = await this.model.findOne({ name: dto.name });
    if (category) throw new ForbiddenException('found that category');

    category = await this.model.create({
      name: dto.name,
      isParent: dto.isParent,
      href: dto.href,
      english: dto.english
    });
    return category;
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
        viewFilters: dto.viewFilters,
        suggessionType: dto.suggestionType,
      });
      let category = await this.model.findByIdAndUpdate(dto.id, {
        $push: { subCategory: subCategory._id },
      });

      return subCategory;
    } catch (e) {
      console.log(e);
    }
  }
  async getAllCategories() {
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
    let discrict = await this.districtModel.find();
    let location = await this.locationModel.find();
    if (!categories) throw new ForbiddenException('not found');

    return { categories, discrict, location };
  }

  async getCategoryById(id: string) {
    console.log(id)
    let category
    if(mongoose.Types.ObjectId.isValid(id))
    {
      category = await this.model
      .findById(id)
      .populate(
        'subCategory',
        'id name subCategory href english filters viewFilters suggessionType',
        this.model,
      )
      .exec();
    } else {
      category = await this.model
      .findOne({href: id})
      .populate(
        'subCategory',
        'id name subCategory href english filters viewFilters',
        this.model,
      )
      .exec();
    }
    
    return category;
  }
  
  async getSubCategoryFiltersById(id: string, isFilter: string) {
    
    let subCategory 
    if(mongoose.Types.ObjectId.isValid(id))  {
      subCategory = await this.model.findById(id).exec();
    } else {
      subCategory = await this.model.findOne({href: id}).exec();
    }
    if (!subCategory)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);

    let filters = [];
    if (isFilter == 'true') {
      filters = subCategory.filters.map((f) => getFilter(f as Filters));
    } else {
      filters = subCategory.steps.map((f) => getStep(f.step, f.values ));
    }
    return { subCategory, filters };
  }

  async updateCategoryById(id: string, dto: UpdateCategoryDto) {

    let ad 
    try {
      ad = await this.model.findByIdAndUpdate(id, {
        name: dto.name,
          href: dto.href,
          english: dto.english,
          isParent: dto.isParent,
          filters: dto.filters,
          steps: dto.steps,
          viewFilters: dto.viewFilters,
          suggessionType: dto.suggestionType,
      })
    } catch (error) {
      throw new HttpException(error.message, 500)
    } 
    return true
  }

  async deleteAllCategory() {
    let category = this.model.deleteMany().then((d) => console.log(d));
    return category;
  }
}
