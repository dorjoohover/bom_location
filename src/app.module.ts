import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import appConfig from './config/app.config';
import { AdModule } from './resource/ad/ad.module';
import { AuthModule } from './resource/auth/auth.module';
import { CategoryModule } from './resource/category/category.module';
import { ItemsModule } from './resource/items/items.module';
import { UserModule } from './resource/user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: "smtp.ethereal.email",
          port: 587,
          service: 'gmail',
          auth: {
              user : "dorjoohover@gmail.com",
              pass : "iqdyorsoujglrlym"
          },
        },
        defaults: {
          from: "dorjoohover@gmail.com"
        },
      }),}),
    MongooseModule.forRoot( appConfig().dbUrl, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: appConfig().dbName,
      
    }),
    UserModule,
    AdModule,
    CategoryModule,
    AuthModule,
    ItemsModule

  ],
})
export class AppModule {}
