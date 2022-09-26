import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';
import { configDBService } from './config/config.db.service';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const context = 'Denttistapplication';
  const logger = new Logger(context);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  const dbConfig = configDBService.getTypeOrmConfig();

  app.enableCors();
  app.setGlobalPrefix(appConfig.globalPrefix);
  // allow to validate body requests (DTOs) with validation decorators
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // allow inject dependencies in custom validation decorators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const server = await app.listen(appConfig.http.port, appConfig.http.host);

  if (process.env.NODE_ENV === 'production')
    server.setTimeout(appConfig.timeout);
  logger.debug(`Server environment set to ${appConfig.env}`);
  logger.debug(`App save logs set to ${appConfig.saveLogs}`);
  logger.log(`Database : ${dbConfig.database}`);
  logger.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
