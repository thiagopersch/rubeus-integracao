import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { sessionConfig } from './session.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(sessionConfig);
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin:
      process.env.APP_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(3333);
  console.log('🚀 Initialized server');
}
bootstrap();
