import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { CommitteeModule } from './resource/committee/committee.module';
import { DistrictModule } from './resource/district/district.module';
import { LocationModule } from './resource/location/location.module';
import { UserModule } from './resource/user/user.module';
import { ZoneModule } from './resource/zone/zone.module';

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
    ZoneModule,
    DistrictModule,
    LocationModule,
    CommitteeModule,
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
