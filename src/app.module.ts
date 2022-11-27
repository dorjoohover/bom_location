import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AdModule } from './resource/ad/ad.module';
import { CategoryModule } from './resource/category/category.module';
import { CommitteeModule } from './resource/committee/committee.module';
import { DistrictModule } from './resource/district/district.module';
import { FilterModule } from './resource/filter/filter.module';
import { LocationModule } from './resource/location/location.module';
import { PositionModule } from './resource/position/position.module';
import { AdTypeModule } from './resource/adtype/ad_type.module';
import { TownModule } from './resource/town/town.module';
import { UserModule } from './resource/user/user.module';
import { ZoneModule } from './resource/zone/zone.module';
import { TypeModule } from './resource/type/type.module';
import { AuthModule } from './resource/auth/auth.module';
import { UserService } from './resource/user/user.service';
import { UserController } from './resource/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
      ],
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRoot( 'mongodb+srv://dorjoo:dorjooX0@cluster0.adxdtn0.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: 'zipcode'
    }),
    UserModule,
    FilterModule,
    PositionModule,
    LocationModule,
    TownModule,
    AdModule,
    CategoryModule,
    DistrictModule,
    LocationModule,
    CommitteeModule,
    AdTypeModule,
    AuthModule,
    TypeModule,

  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
