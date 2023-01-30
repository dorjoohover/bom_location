import { Module, } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ad, AdSchema,  Category, CategorySchema, User, UserSchema} from 'src/schema';
import { AdController } from './ad.controller';
import { AdService } from './ad.service';
import { SuggestionService } from './suggestion.service';



@Module({
  imports: [MongooseModule.forFeature([{name: Ad.name, schema: AdSchema}, {name: Category.name, schema: CategorySchema}, {name: User.name, schema: UserSchema},  ]), 
],
  controllers: [AdController, ],
  providers: [AdService, SuggestionService,  ],
  exports: []
})
export class AdModule {}
