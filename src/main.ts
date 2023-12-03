import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://8tech.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  app.useGlobalInterceptors(new ResponseInterceptor());

  const version = process.env.npm_package_version;

  const config = new DocumentBuilder()
    .setTitle('8Tech-auth')
    .setDescription('This is auth service for 8Tech app')
    .setVersion(version)
    .addBearerAuth()
    .addCookieAuth('EToken')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          return {
            [error.property]: Object.values(error.constraints)[0],
          };
        });
        console.error('#Validation error caused by: ', errors);
        return new HttpException(result, HttpStatus.BAD_REQUEST);
      },
      stopAtFirstError: true,
    }),
  );

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
