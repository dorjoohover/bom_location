import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema, Discrict, DiscrictSchema } from 'src/schema';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Location.name, schema: LocationSchema}, {name: Discrict.name, schema: DiscrictSchema}])],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
