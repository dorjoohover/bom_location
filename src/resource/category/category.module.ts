import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdType, AdTypeSchema, Category, CategorySchema, Filter, FilterSchema } from 'src/schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}, {name: Filter.name, schema: FilterSchema}, {name: AdType.name, schema: AdTypeSchema}])],
  providers: [CategoryService],
  controllers: [CategoryController],
  
})
export class CategoryModule {}
