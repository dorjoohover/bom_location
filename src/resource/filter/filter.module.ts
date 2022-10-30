import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Filter, FilterSchema } from 'src/schema';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Filter.name, schema: FilterSchema}])],
  controllers: [FilterController],
  providers: [FilterService]
})
export class FilterModule {}
