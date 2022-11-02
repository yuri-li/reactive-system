# Vue 3 + TypeScript + Vite

# 配置目标

- 不再使用js配置（不会出现js后缀的配置代码）
- 遵守ES Module规范（不会出现commonjs的配置代码）

# 版本管理

| 名称            | 描述                  | version         | 备注                                                                  |
| ------------- | ------------------- | --------------- | ------------------------------------------------------------------- |
| intellij idea | 开发工具                |                 | 前端项目已经很复杂了，vscode的插件安装/配置也多了，换成intellij idea，可以少很多麻烦                |
| nodejs        | 运行环境                | stable v18.12.0 |                                                                     |
| npm           | 包管理工具               | 8.19.2          | 使用npm（安装/升级）yarn                                                    |
| yarn          | 包管理工具               | 1.22.19         |                                                                     |
| eslint        | 代码格式校验              | 8.22.0          | 必须是这个版本，否则，构建报错`TypeError: this.libOptions.parse is not a function` |
| vitest        | 测试框架                | 0.24.5          |                                                                     |
| ts-node       | 可以直接运行typescript的工具 | 10.9.1          |                                                                     |
| vite          | 前端开发与构建工具           | 3.2.2           |                                                                     |


# 路径管理

- `@`，代表“src/”目录

- `~`，代表“test/”目录

# 测试

- 使用eslint检测代码
- 使用vitest执行`test/HelloWorld.spec.ts`
- 使用vitest检查测试覆盖率