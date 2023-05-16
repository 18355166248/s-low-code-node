import { INestApplication } from '@nestjs/common';
import { getServerConfig } from 'ormconfig';
import { LogEnum } from './enum/config.enum';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export const setupApp = (app: INestApplication) => {
  const config = getServerConfig();

  const flag = config[LogEnum.LOG_ON] === 'true'; // 是否开启日志
  flag && app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 设置路由前缀
  app.setGlobalPrefix('/v1/api');

  // 全局拦截器
};
