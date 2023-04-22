import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/schema';
import { ItemsController } from './items.controller';
@Module({
  imports: [MongooseModule.forFeature([{name: Item.name, schema: ItemSchema, 
  }])],
  controllers: [ItemsController],

})
export class ItemsModule {}
