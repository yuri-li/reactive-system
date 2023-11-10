# vite + ts 模板项目

# 1 简介

使用`vite + ts`创建的`libaray`项目。

构建一些工具（项目），上传到npm repository，让第三方使用

- 没有vue的依赖

- 没有html

- 是后台使用的模板项目

# 2 配置

**只展示关键的字段**

## 2.1 package.json

```json
{
  "name": "ts-lib", //请先确认，在npm repository上是否重名。否则，上传失败
  "main": "dist/ts-lib.mjs",
  "module": "dist/ts-lib.mjs",
  "types": "dist/index.d.ts", 
  "homepage": "https://github.com/xxx", //源码上传到github的url
  "scripts": {
    "build": "tsc && vite build", //构建
    "release": "tsc && vite build && yarn publish" //构建 + 上传
  },
}
```

## 2.2 vite.config.ts

其中，`build > rollupOptions > external`，引用node的代码，都需要忽略。因为vite默认构建的是浏览器中运行的js文件，不是后台使用的。而浏览器中没有node的运行环境，如果不排除这些依赖，构建会失败。

```typescript
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins:[
        dts(), // 生成 x.d.ts文件
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, "src/index.ts"), // library入口文件
            formats: ["es"], //“ES” modules
        },
        rollupOptions: {
            //忽略 import { xxx } from "fs"
            //忽略 import { xxx } from "path"
            external: ["fs", "path"],
        },
    },
})
```

## 2.3 .npmignore

不需要上传到npm repository的文件或目录

# 3 上传到npm repository

```
# 1 https://www.npmjs.com/
# 2 进入账户，创建Access Token。类型必须是：Automation 或 Publish。
#   否则，没有上传的权限

# 3 复制Access Token

# 4 修改环境变量`.zshrc`，添加变量`NPM_TOKEN`
$ vim ~/.zshrc
export NPM_TOKEN="npm_xxxxxx"
xxxxxx

# 5 让环境变量生效
$ source ~/.zshrc

# 6 设置npm全局变量（上传时，会自动读取这个值）
$ npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN

# 7 构建 + 发布
## 7.1 检查package.json > version。
## 请再次确认npm repository没有重名（和版本号）的项目

## 7.2 发布
yarn release
```

# 4 如何使用？

请参考[demo](https://github.com/yuri-li/reactive-system/tree/main/vue3-demo/dev-tools/generate-routes)

|      | generate-routes/core | generate-routes/core-test |
| ---- | -------------------- | ------------------------- |
| 项目构建 | vite + typescript    | vite + typescript + vue3  |
| 用途   | 工具项目，生成vue-router的代码 | 测试工具项目                    |