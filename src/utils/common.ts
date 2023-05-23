import { Logs } from 'src/logs/entities/log.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

const routerMap = {
  '/user': User,
  '/role': Role,
  '/logs': Logs,
  '/menu': Menu,
  '/auth': 'Auth',
};

// 通过菜单路径获取实体
export function getEntities(path: string): any {
  for (let i = 0; i < Object.keys(routerMap).length; i++) {
    const key = Object.keys(routerMap)[i];
    if (path.startsWith(key)) {
      return routerMap[key];
    }
  }
}
