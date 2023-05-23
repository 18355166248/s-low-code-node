# 迁移

假如说我更新了数据库的字段

这个时候需要更新数据库

步骤如下

1. npm run migration:generate name (name 就是你要更新这次操作的语义化名字 随意写即可)
2. 执行完上面的操作后会再 src/migration 文件夹下生成一个文件 包含更新和回退的命令 再执行 npm run igration:run 即可更新到数据

假如说更新有问题需要回退 请执行 npm run igration:revert
