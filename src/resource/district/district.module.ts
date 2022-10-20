import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Discrict, DiscrictSchema } from 'src/schema';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Discrict.name, schema: DiscrictSchema}])
  ],
  controllers: [DistrictController],
  providers: [DistrictService]
})
export class DistrictModule {}
