/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from '@prisma/prisma-client';
import { ClsMiddleware } from 'nestjs-cls';
import { AppModule } from './app/app.module';


async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuration des limites de taille pour les uploads Base64
  app.use(require('express').json({ limit: '10mb' }));
  app.use(require('express').urlencoded({ limit: '10mb', extended: true }));

  // Configuration CORS pour permettre les requêtes depuis le frontend
  app.enableCors({
    origin: ['http://localhost:4100', 'http://127.0.0.1:4100'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Servir les fichiers statiques (avatars uploadés)
  app.useStaticAssets('./files', {
    prefix: '/files/',
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

    // app.enableShutdownHooks()

/* Nestjs has a built-in validation pipe: The ValidationPipe provides a convenient approach
    to enforce validation rules for all incoming client payloads,
    where the validation rules are declared with decorators from the class-validator package.
 */
    app.useGlobalPipes(new ValidationPipe({  // see https://www.notion.so/jclmaq5510/Validation-and-Transformation-9a2da8a694004fc8a0f2e64445ae3892
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    /* NestJS has a built-in ClassSerializerInterceptor that can be used to transform objects.
      You will use this interceptor to remove the password field from the response object.
      The ClassSerializerInterceptor uses the class-transformer package to define how to transform objects.
      Use the @Exclude() decorator to exclude the password field in the UserEntity class
    */
    app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
    );


    const globalPrefix = process.env.NEST_SERVER_GLOBAL_PREFIX ||'api';
    app.setGlobalPrefix(globalPrefix);

    // NestJS CLS - create and mount the middleware manually here
    app.use(
      new ClsMiddleware({
          /* useEnterWith: true */
      }).use,
  );

    // const configService = app.get(ConfigService);
  // const port: number = configService.get<number>('NEST_SERVER_PORT') || 3100;
  // const port: number = configService.get('NEST_SERVER_PORT');
  // const port = 3100;


  const port = process.env.NEST_SERVER_PORT || 3333;
// const port = process.env.NEST_SERVER_PORT


  // Swagger config
  const config = new DocumentBuilder()
  .setTitle(process.env.SET_APP_TITLE)
  .setDescription(process.env.SET_APP_DESCRIPTION)
  .setVersion(process.env.SET_APP_VERSION)
  .addTag(process.env.SET_APP_ADDTAG)
  .build();

/*
  Bug avec circular dependency for Roles....
  */
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false
  });

  SwaggerModule.setup('/api/doc', app, document);


  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
