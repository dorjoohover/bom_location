import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Town, TownSchema } from 'src/schema';
import { TownController } from './town.controller';
import { TownService } from './town.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Town.name, schema: TownSchema}])],
  controllers: [TownController],
  providers: [TownService]
})
export class TownModule {}
