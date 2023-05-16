import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionParams } from 'ormconfig';
import { LogsModule } from './logs/logs.module';

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  DB_PORT: Joi.number().default(3306),
  DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
  DB_TYPE: Joi.string().valid('mysql', 'postgres'),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
  LOG_ON: Joi.boolean(),
  LOG_LEVEL: Joi.string(),
});

@Global()
@Module({
  imports: [
    // 环境变了配置和校验
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          const values = dotenv.config({ path: '.env' });
          const { error } = schema.validate(values?.parsed, {
            // 允许未知的环境变量
            allowUnknown: true,
            // 如果有错误，不要立即停止，而是收集所有错误
            abortEarly: false,
          });
          if (error) {
            throw new Error(`Validation failed - Is there an environment variable missing?
            ${error.message}`);
          }

          return values;
        },
      ],
      validationSchema: schema,
    }),
    TypeOrmModule.forRoot(connectionParams),
    LogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
