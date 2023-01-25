import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdModule } from './resource/ad/ad.module';
import { AuthModule } from './resource/auth/auth.module';
import { CategoryModule } from './resource/category/category.module';
import { DistrictModule } from './resource/district/district.module';
import { LocationModule } from './resource/location/location.module';
import { TownModule } from './resource/town/town.module';
import { UserModule } from './resource/user/user.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: [
    //     process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
    //   ],
    //   load: [configuration],
    //   isGlobal: true
    // }),
    MongooseModule.forRoot( 'mongodb+srv://dorjoo:dorjooX0@cluster0.adxdtn0.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: 'zipcode'
    }),
    UserModule,
    // FilterModule,
    // PositionModule,
    // LocationModule,
    TownModule,
    AdModule,
    CategoryModule,
    DistrictModule,
    LocationModule,
    // CommitteeModule,
    // // AdTypeModule,
    AuthModule,
    // TypeModule,
  ],
})
export class AppModule {}
