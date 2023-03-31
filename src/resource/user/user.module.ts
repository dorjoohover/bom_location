import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema, Feedback, FeedbackSchema, User, UserSchema } from 'src/schema';
import { S3Service } from '../ad/s3.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Ad.name, schema: AdSchema },
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
  controllers: [UserController, BookmarkController],
  providers: [UserService, BookmarkService, S3Service],
  exports: [UserService, BookmarkService],
})
export class UserModule {}
