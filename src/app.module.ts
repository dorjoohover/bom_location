import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from './config/app.config';
import { AdModule } from './resource/ad/ad.module';
import { AuthModule } from './resource/auth/auth.module';
import { CategoryModule } from './resource/category/category.module';
import { DistrictModule } from './resource/district/district.module';
import { LocationModule } from './resource/location/location.module';
import { UserModule } from './resource/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),
    MongooseModule.forRoot( appConfig().dbUrl, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: appConfig().dbName
    }),
    UserModule,
    AdModule,
    CategoryModule,
    DistrictModule,
    LocationModule,
    AuthModule,

  ],
})
export class AppModule {}
