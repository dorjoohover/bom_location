import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ad, AdSchema, Category, CategorySchema, Discrict, DiscrictSchema, Location, LocationSchema, User, UserSchema } from 'src/schema';
import { CategoryService } from '../category/category.service';
import { AdController } from './ad.controller';
import { AdService } from './ad.service';
import { S3Service } from './s3.service';
import { SuggestionService } from './suggestion.service';



@Module({
  imports: [MongooseModule.forFeature([{name: Ad.name, schema: AdSchema}, {name: Category.name, schema: CategorySchema}, {name: User.name, schema: UserSchema},  {name: Location.name, schema: LocationSchema} , {name: Discrict.name, schema: DiscrictSchema},   ]), 
],
  controllers: [AdController, ],
  providers: [AdService, SuggestionService, S3Service, CategoryService  ],
  exports: []
})
export class AdModule {}
