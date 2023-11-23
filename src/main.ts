import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });

  const version = process.env.npm_package_version;

  const config = new DocumentBuilder()
    .setTitle('8Tech-auth')
    .setDescription('This is auth service for 8Tech app')
    .setVersion(version)
    .addBearerAuth()
    .addCookieAuth('EToken')
    .build();

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  // await app.listen(3000, process.env.HOSTNAME);
  await app.listen(3000);
  console.log(
    `8Tech-auth swagger is running on: ${await app.getUrl()}/api/swagger`,
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
