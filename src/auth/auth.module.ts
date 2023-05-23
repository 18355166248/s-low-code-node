import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum';
import { JwtStrategy } from './auth.strategy';
import { CaslAbilityService } from './casl-ability.service';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>(ConfigEnum.SECRET),
          signOptions: {
            expiresIn: '1d', // 表示一天 文档 https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, CaslAbilityService],
  controllers: [AuthController],
  exports: [CaslAbilityService],
})
export class AuthModule {}
