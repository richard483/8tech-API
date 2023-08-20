import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  await app.listen(3000, process.env.HOSTNAME);
  console.log(
    `8Tech-auth swagger is running on: ${await app.getUrl()}/api/swagger`,
  );
}
bootstrap();
