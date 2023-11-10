# 部署redis server

```
# 1 下载redis镜像
docker image pull redis:rc-alpine3.13

# 2 创建redis需要的volume
yuri@yuris-MBP ~ % docker volume create redis
redis

# 3 启动redis container
docker container run --name redis \
--mount type=volume,source=redis,target=/data \
-p 6379:6379 \
-d redis:rc-alpine3.13 \
redis-server --appendonly yes

# 4 测试
$ docker container exec -it redis sh  
/data # redis-cli
127.0.0.1:6379> keys *

# 5 设置用户名和密码
127.0.0.1:6379> acl list
1) "user default on nopass ~* &* +@all"
127.0.0.1:6379> ACL SETUSER account on >pxpp0 ~* &* +@all
OK
127.0.0.1:6379> acl list
1) "user account on #2d9c75273d72b32df726fb545c8a4edc719f0a95a6fd993950b10c474ad9c927 ~* &* +@all"
2) "user default on nopass ~* &* +@all"
127.0.0.1:6379> auth account pxpp0
OK
127.0.0.1:6379> acl list
1) "user account on #2d9c75273d72b32df726fb545c8a4edc719f0a95a6fd993950b10c474ad9c927 ~* &* +@all"
2) "user default on nopass ~* &* +@all"
127.0.0.1:6379> keys  *
(empty array)

# 6 禁止匿名用户访问
127.0.0.1:6379> acl setuser default off -@all
```
