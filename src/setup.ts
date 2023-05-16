import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getServerConfig } from 'ormconfig';
import { LogEnum } from './enum/config.enum';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const setupApp = (app: INestApplication) => {
  const config = getServerConfig();

  const flag = config[LogEnum.LOG_ON] === 'true'; // 是否开启日志
  flag && app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 设置路由前缀
  app.setGlobalPrefix('/v1/api');

  // 全局拦截器
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在类上不存在的字段
      whitelist: true,
    }),
  );

  // helmet头部安全
  app.use(helmet);

  // 限流
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }),
  );
};
