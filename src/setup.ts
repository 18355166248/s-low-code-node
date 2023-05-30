import {
  BadRequestException,
  HttpStatus,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { getServerConfig } from 'ormconfig';
import { LogEnum } from './enum/config.enum';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { HttpExceptionFilter } from './filters/typeorm.filter';
import { HttpResponseInterceptor } from './interceptors/response.interceptor';

export const setupApp = (app: INestApplication) => {
  const config = getServerConfig();

  const flag = config[LogEnum.LOG_ON] === 'true'; // 是否开启日志
  flag && app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 设置路由前缀
  app.setGlobalPrefix('/api/v1');

  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));

  // 全局拦截器
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在类上不存在的字段
      // TODO: 重要 设置了 whitelist, 会删除没有被 class-Validator 装饰器装饰的属性)
      whitelist: true,
      // 禁止非白名单参数，存在非白名单属性报错。此项可根据需求而定，如果设置false，将剥离非白名单属性
      forbidNonWhitelisted: false,
      // 设置校验失败后返回的http状态码
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      // 设置校验失败后的响应数据格式
      exceptionFactory: (errors) => {
        // 此处要注意，errors是一个对象数组，包含了当前所调接口里，所有验证失败的参数及错误信息。
        // 此处的处理是只返回第一个错误信息
        const msg = Object.values(errors[0].constraints)[0];
        return new BadRequestException({
          msg: msg,
          status: HttpStatus.BAD_REQUEST,
        });
      },
    }),
  );

  // helmet头部安全
  app.use(helmet());

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
