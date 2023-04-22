import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdStatus, AdTypes, AdView } from 'src/config/enum';
import {
  Ad,
  AdDocument,
  Category,
  CategoryDocument,
  User,
  UserDocument
} from 'src/schema';
import { CategoryService } from '../category/category.service';
import { AdDto } from './ad.dto';


@Injectable()
export class AdService {
  constructor(
    @InjectModel(Ad.name) private model: Model<AdDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private categoryService: CategoryService,
  ) {}

  async createAd(dto: AdDto, user: string) {
    let prevAd = await this.model.findOne().sort({ createdAt: 'desc' });
    let adNum = 1;
    if (prevAd) adNum = prevAd?.num + 1;
    try {
      let ad = await this.model.create({
        num: adNum,
        user: user,
        images: dto.images,
        title: dto.title,
        description: dto.description,
        location: dto.location,
        category: dto.category,
        subCategory: dto.subCategory,
        sellType: dto.sellType,
        items: dto.items,
        adType: dto.adType,
        adStatus: AdStatus.pending,
        image: dto.image,
        file: dto.file,
        view: dto.view,
      });
      await this.userModel.findByIdAndUpdate(user, {
        $push: { ads: ad._id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
    return true;
  }

  async  getAds(num: number, limit: number, view: boolean, type: AdTypes, isType: boolean ) {
    let ads =  await this.model
      .find( isType && view ? {
        view: AdView.show,
        type: type,
      } : isType ? {
        type: type
      } : view ? 
        {view: view} : {}
      )
      .populate('user', 'id phone email username profileImg', this.userModel)
      .populate('category', 'id name', this.categoryModel)
      .populate('subCategory', 'id name', this.categoryModel)
      .limit(limit)
      .skip(num * limit)
 
    if (!ads)
      throw new HttpException('not found ads', HttpStatus.BAD_REQUEST);
    return {ads:ads, limit: ads.length}
  }




  async updateStatusTimed() {
    const date = Date.now();
    const deletedDate = date - 3 * 24 * 60 * 60 * 1000;
    const lateDate = date - 60 * 24 * 60 * 60 * 1000;

    let ads = await this.model.updateMany({
      $or: [
        {
          $and: [
            { createdAt: { $lt: lateDate } },
            { adStatus: AdStatus.created },
          ],
        },
        {
          $and: [
            { updatedAt: { $lt: deletedDate } },
            { adStatus: AdStatus.deleted },
          ],
        },
      ],
    }, {
      adStatus: AdStatus.timed,
      view: AdView.hide,

    });


    return ads;
  }

  async updateTypeAd(id: string, type: AdTypes, isTrue: boolean) {
    try {
      if (isTrue) {
        let ad = await this.model.findByIdAndUpdate(id, {
          adType: type,
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async getAdsByUserId(id: string) {
    try {
      let ads = await this.model
        .find({
          user: id,
          adStatus: 'created',
        })
        .sort({ createdAt: 'desc' });
      return { ads };
    } catch (error) {
      throw new HttpException('server error', 500);
    }
  }
  async updateStatusAd(
    id: string,
    status: AdStatus,
    view: AdView,
    user: string,
    isAdmin: boolean,
    message?: string,
  ) {
    try {
      if (isAdmin) {
        if (status == AdStatus.returned) {
          let ad = await this.model.findByIdAndUpdate(id, {
            adStatus: status,
            view: view,
            returnMessage: message ?? '',
          });
          return ad;
        } else {
          let ad = await this.model.findByIdAndUpdate(id, {
            adStatus: status,
            view: view,
          });
          return ad;
        }
      } else {
        let ad = await this.model.findOne({ _id: id, user: user });
        ad.adStatus = status;
        ad.view = view
        ad.save();
        return ad;
      }
    } catch (error) {
      throw new HttpException('server error', 500);
    }
  }

  async addAdView(id: string, userId: string) {
    let ad = await this.model.findById(id);
    if (
      ad.views.find((a) => a.toString() == userId) == undefined &&
      ad.user.toString() != userId
    ) {
      await this.model.findByIdAndUpdate(ad._id, {
        $push: { views: userId },
      });
      return ad.views.length + 1;
    }
  }

  async searchAd(value: string) {
    let ads = await this.model.find({
      $text: { $search: value },
      isView: true,
    });
    let limit = 0;
    limit = await this.model.count({ $text: { $search: value }, isView: true });

    if (!ads) throw new HttpException('not found', 403);
    return { ads, limit };
  }

  async getManyAds(dto: [], num: number, view: AdView, isView: boolean) {
    let ads = [],
    limit = 0;
  try {
    ads = await this.model
      .find(isView ? {
        _id: { $in: dto } ,
       view: view
   } : {
    _id: { $in: dto } ,

})
      .populate('category', 'id name', this.categoryModel)
      .populate('subCategory', 'id name', this.categoryModel)
      .limit((num + 1) * 10)
      .skip(num * 10);
    limit = ads.length;
  } catch (error) {
    throw new HttpException(error, 500);
  }

  if (!ads) throw new HttpException('not found', HttpStatus.NOT_FOUND);
  return { ads, limit };
  }
  async getAdById(id: string) {
    try {
      let ad = await this.model
        // .findOne({ num: id, isView: true })
        .findOne({ num: id,})
        .populate(
          'subCategory',
          'id name subCategory href english filters viewFilters suggessionType isSearch',
          this.categoryModel,
        )
        .populate(
          'user',
          'phone username email profileImg userType',
          this.userModel,
        );
      if (!ad) throw new ForbiddenException('not found ad');
      return ad;
    } catch (error) {
      console.log(error)
      throw new HttpException('server error', 500);
    }
  }

  async getAdByCategoryId(id: string, num: number) {
    try {
      let category = await this.categoryService.getCategoryById(id);

      let defaultAds = await this.model
        .find({
              $or: [{ subCategory: category._id }, { category: category._id }],
          view: AdView.show 
        })
        .populate('category', 'id name', this.categoryModel)
        .populate('subCategory', 'id name', this.categoryModel)
        .populate(
          'user',
          'phone username email profileImg userType',
          this.userModel,
        )
        .limit((num + 1) * 20)
        .skip(num * 20);

      let specialAds = await this.model
        .find({
          $or: [{ subCategory: category._id }, { category: category._id }],
          view: AdView.show,
          adType: AdTypes.special,
        })
        .populate('category', 'id name', this.categoryModel)
        .populate('subCategory', 'id name', this.categoryModel)
        .populate(
          'user',
          'phone username email profileImg userType',
          this.userModel,
        )
        .limit((num + 1) * 20)
        .skip(num * 20);


      if (!defaultAds) throw new ForbiddenException('not found default ad');
      if (!specialAds) throw new ForbiddenException('not found special ad');

      return {
        defaultAds: {
          ads: defaultAds,
          limit: defaultAds.length,
        },
        specialAds: {
          ads: specialAds,
          limit: specialAds.length,
        },
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async updateAd(id: string, dto: AdDto) {
    try {
      return await this.model.findByIdAndUpdate(id, {
        images: dto.images,
        title: dto.title,
        description: dto.description,
        location: dto.location,
        sellType: dto.sellType,
        items: dto.items,
        adStatus: AdStatus.pending,
        image: dto.image,
        file: dto.file,
        view: dto.view,
      })
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
  
  async delete() {
    return await this.model.deleteMany()
  }
}
