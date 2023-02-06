import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema, Discrict, DiscrictSchema, Location, LocationSchema } from 'src/schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Category.name, schema: CategorySchema},{name: Location.name, schema: LocationSchema}, {name: Discrict.name, schema: DiscrictSchema},])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
