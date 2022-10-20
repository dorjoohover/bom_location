import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Committee, CommitteeSchema } from 'src/schema';
import { CommitteeController } from './committee.controller';
import { CommitteeService } from './committee.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Committee.name, schema: CommitteeSchema}])],
  controllers: [CommitteeController],
  providers: [CommitteeService]
})
export class CommitteeModule {}
