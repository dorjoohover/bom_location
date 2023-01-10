import { setByPath } from '@casl/ability/dist/types/utils';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import {
  AdType,
  AdTypeDocument,
  Category,
  CategoryDocument,
  CategorySchema,
  Discrict,
  DistrictDocument,
  Filter,
  FilterDocument,
  LocationDocument,
  Location,
} from 'src/schema';
import {
  CreateCategoryDto,
  CreateSubCategory,
  UpdateCategoryDto,
} from './category.dto';
import { Filters, getFilter } from './interface/categoryEnum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private model: Model<CategoryDocument>,
    @InjectModel(Filter.name) private filterModel: Model<FilterDocument>,
    @InjectModel(AdType.name) private typeModel: Model<AdTypeDocument>,
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
    
    let category
    if(mongoose.Types.ObjectId.isValid(id))
    {
      category = await this.model
      .findById(id)
      .populate(
        'subCategory',
        'id name subCategory href english filters viewFilters',
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
      filters = subCategory.viewFilters.map((f) => getFilter(f as Filters));
    }
    return { subCategory, filters };
  }

  async updateCategoryById(id: string, dto: UpdateCategoryDto) {}

  async deleteAllCategory() {
    let category = this.model.deleteMany().then((d) => console.log(d));
    return category;
  }
}
