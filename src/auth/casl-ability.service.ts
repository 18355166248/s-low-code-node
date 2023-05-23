import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { UserService } from '../user/user.service';
import { Menu } from 'src/menus/entities/menu.entity';
import { getEntities } from 'src/utils/common';

@Injectable()
export class CaslAbilityService {
  constructor(private userService: UserService) {}

  async forRoot(userName: string) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    const user = await this.userService.find(userName);

    const obj = {} as Record<string, unknown>;
    user.roles.forEach((v) => {
      v.menus.forEach((menu) => {
        obj[menu.id] = menu;
      });
    });
    const menus = Object.values(obj) as Menu[];
    // 通过用户的菜单初始化权限
    menus.forEach((menu) => {
      const actions = menu.acl.split(',');
      actions.forEach((action) => {
        can(action, getEntities(menu.path));
      });
    });

    const ability = build({
      detectSubjectType: (object) => object.constructor as any,
    });

    return ability;
  }
}
