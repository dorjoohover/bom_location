import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from 'src/schema';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Position.name, schema: PositionSchema}])],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
