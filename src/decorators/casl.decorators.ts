import { AnyMongoAbility, InferSubjects, subject } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';
import { Action } from '../enum/action.enum';

export enum CHECK_POLICIES_KEY {
  HANDLER = 'CHECK_POLICIES_HANDLER',
  CAN = 'CHECK_POLICIES_CAN',
  CANNOT = 'CHECK_POLICIES_CANNOT',
}

interface IPolicyHandler {
  handle(ability: AnyMongoAbility): boolean;
}

type PolicyHandlerCallback = (ability: AnyMongoAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY.HANDLER, handlers);

export const Can = (
  action: Action,
  subject: InferSubjects<any>,
  conditions?: any,
) =>
  SetMetadata(CHECK_POLICIES_KEY.CAN, (ability: AnyMongoAbility) =>
    ability.can(action, subject, conditions),
  );

export const Cannot = (
  action: Action,
  subject: InferSubjects<any>,
  conditions?: any,
) =>
  SetMetadata(CHECK_POLICIES_KEY.CANNOT, (ability: AnyMongoAbility) =>
    ability.cannot(action, subject, conditions),
  );
