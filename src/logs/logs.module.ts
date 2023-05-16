import { Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { utilities } from 'nest-winston';
import { LogEnum } from 'src/enum/config.enum';
import 'winston-daily-rotate-file';

function createDailyRotateTrasnport(level: string, filename: string) {
  return new winston.transports.DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const timestamp = configService.get(LogEnum.TIMESTAMP) === 'true';
        const conbine = [];
        if (timestamp) {
          conbine.push(winston.format.timestamp());
        }
        conbine.push(utilities.format.nestLike());
        const consoleTransports = new winston.transports.Console({
          level: configService.get(LogEnum.LOG_LEVEL) || 'info',
          format: winston.format.combine(...conbine),
        });

        return {
          transports: [
            consoleTransports,
            ...(configService.get(LogEnum.LOG_ON)
              ? [
                  createDailyRotateTrasnport('info', 'application'),
                  createDailyRotateTrasnport('warn', 'error'),
                ]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class LogsModule {}
