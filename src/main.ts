import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getServerConfig } from '../ormconfig';
import { setupApp } from './setup';

async function bootstrap() {
  const config = getServerConfig();

  const app = await NestFactory.create(AppModule);
  setupApp(app);

  const port =
    typeof config['APP_PORT'] === 'string'
      ? parseInt(config['APP_PORT'])
      : 3000;
  await app.listen(port);
}
bootstrap();
