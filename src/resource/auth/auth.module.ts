import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [MailerModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (config: ConfigService) => ({
          transport: {
            host: 'smtp.ethereal.email',
            port: 587,
            service: 'gmail',
            auth: {
                user : 'dorjoohover@gmail.com',
                pass : 'txrwdhgnbrxajlud'
            },
          },
          defaults: {
            from: 'dorjoohover@gmail.com'
          },
        }),}),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}