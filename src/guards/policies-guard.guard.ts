import { AnyMongoAbility } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityService } from '../auth/casl-ability.service';
import {
  CHECK_POLICIES_KEY,
  PolicyHandler,
} from '../decorators/casl.decorators';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityService: CaslAbilityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.getAllAndMerge<PolicyHandler[]>(
      CHECK_POLICIES_KEY.HANDLER,
      [context.getHandler(), context.getClass()],
    );

    const canHandlers = this.reflector.getAllAndMerge<PolicyHandler[]>(
      CHECK_POLICIES_KEY.CAN,
      [context.getHandler(), context.getClass()],
    );

    const canNotHandlers = this.reflector.getAllAndMerge<PolicyHandler[]>(
      CHECK_POLICIES_KEY.CANNOT,
      [context.getHandler(), context.getClass()],
    );

    // 如果用户没有上述的任何一个acl 就返回true
    if (!policyHandlers && !canHandlers && !canNotHandlers) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    // 这里能拿到user 是通过 JwtAuthGuard
    if (req.user) {
      // 获取用户的权限
      const ability = await this.caslAbilityService.forRoot(req.user.username);

      // 是否有权限
      let flag = true;
      if (policyHandlers) {
        flag = policyHandlers.every((handler) =>
          this.execPolicyHandler(handler, ability),
        );
      }

      if (flag && canHandlers) {
        if (Array.isArray(canHandlers)) {
          flag = canHandlers.every((handler) =>
            this.execPolicyHandler(handler, ability),
          );
        } else if (typeof canHandlers === 'function') {
          flag = this.execPolicyHandler(canHandlers, ability);
        }
      }
      if (flag && canNotHandlers) {
        if (Array.isArray(canNotHandlers)) {
          flag = canNotHandlers.every((handler) =>
            this.execPolicyHandler(handler, ability),
          );
        } else if (typeof canNotHandlers === 'function') {
          flag = this.execPolicyHandler(canNotHandlers, ability);
        }
      }
      if (!flag) {
        throw new ForbiddenException('暂无权限');
      }
      return flag;
    } else {
      throw new ForbiddenException('暂无权限');
    }
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AnyMongoAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
