# 迁移

假如说我更新了数据库的字段

这个时候需要更新数据库

步骤如下

1. npm run migration:generate ./src/migrations/name (name 就是你要更新这次操作的语义化名字 随意写即可)
2. 执行完上面的操作后会再 src/migration 文件夹下生成一个文件 包含更新和回退的命令 再执行 npm run migration:run 即可更新到数据

假如说更新有问题需要回退 请执行 npm run migration:revert

### 问题:

1.如果是报错的话 Cannot find module 'src/project/enti.... 那就是路径别名的问题 需要将路径修改成相对路径

1. npm run migration:generate name (name 就是你要更新这次操作的语义化名字 随意写即可)
2. 执行完上面的操作后会再 src/migration 文件夹下生成一个文件 包含更新和回退的命令 再执行 npm run igration:run 即可更新到数据

```json
{
  "typeorm": "typeorm-ts-node-commonjs -d ormconfig.ts",
  "migration:generate": "f() { npm run typeorm migration:generate -p \"./src/migrations/$@\"; }; f",
  "migration:create": "typeorm-ts-node-commonjs migration:create"
}
```
