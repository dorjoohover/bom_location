import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from 'src/config/app.config';
import { User, UserSchema } from 'src/schema';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [MailerModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (config: ConfigService) => ({
          transport: {
            host: appConfig().nodemailerHost,
            port: parseInt(appConfig().nodemailerPort),
            service: 'gmail',
            auth: {
                user : appConfig().nodemailerUser,
                pass : appConfig().nodemailerPass
            },
          },
          defaults: {
            from: appConfig().nodemailerUser
          },
        }),}),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule {}