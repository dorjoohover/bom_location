
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app)
  await app.listen(process.env.PORT || 5050);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
