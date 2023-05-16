## Docker

启动 mysql

```js
docker-compose -f docker-compose.yaml up -d  //-f调用文件。-d:开启守护进程
docker-compose up -d  //-f调用文件。-d:开启守护进程
```

- -f，–file：指定使用的 Compose 模板文件，默认为 docker-compose.yml，可以多次指定，指定多个 yml；
- -p, --project-name：指定工程名称，默认使用 docker-compose.yml 文件所在目录的名称；
  -v：打印版本并退出；
- –log-level：定义日志等级（DEBUG, INFO, WARNING, ERROR, CRITICAL）。

#### config

docker-compose config -q 验证 docker-compose.yml 文件。当配置正确时，不输出任何内容，当配置错误时，输出错误信息。

#### ps

docker-compose ps 列出工程中所有服务的容器。

#### pause

docker-compose pause 暂停服务容器

#### unpause

docker-compose unpause 恢复服务容器。

#### restart

docker-compose restart 重启服务容器。

#### start

docker-compose start 启动服务容器。

#### stop

docker-compose stop 停止服务容器。

#### images

docker-compose images 打印服务容器所对应的镜像。
