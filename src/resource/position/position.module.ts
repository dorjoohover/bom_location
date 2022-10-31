import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema, Discrict, DiscrictSchema,Location, Committee, CommitteeSchema, LocationSchema, Town, TownSchema } from 'src/schema';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Position.name, schema: PositionSchema}, {name: Discrict.name, schema: DiscrictSchema}, {name: Committee.name, schema: CommitteeSchema}, {name: Location.name, schema: LocationSchema}, {name: Town.name, schema: TownSchema}])],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
