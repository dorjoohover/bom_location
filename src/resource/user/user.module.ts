import { Module , forwardRef, Global} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema, User, UserSchema } from 'src/schema';
import { AdModule } from '../ad/ad.module';
import { S3Service } from '../ad/s3.service';
import { AuthService } from '../auth/auth.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Global()
@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema, 
  }, {name: Ad.name, schema: AdSchema, 
  }])],
  controllers: [UserController, BookmarkController],
  providers: [UserService, BookmarkService, S3Service],
  exports: [UserService, BookmarkService]
})
export class UserModule {}
