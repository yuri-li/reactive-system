# rx-crud

- 禁止重复提交
- 只提交用户**修改过**的数据

# 1 做什么？

`diff(cache,formData) = T | DiffDetail<T>`

其中，

- formData是用户提交的数据

- cache是用作对比的数据，比如，用户上次提交的formData

![](https://github.com/yuri-li/reactive-system/raw/main/vue3-demo/dev-tools/rx-crud/core/assets/2023-11-03-08-45-57-image.png)

# 2 数据对比结果

![](https://github.com/yuri-li/reactive-system/raw/main/vue3-demo/dev-tools/rx-crud/core/assets/2023-11-05-19-16-53-image.png)

# 3 安装与使用

```
npm i -D rx-crud
```

# 4 demo

[rx-crud-test](https://github.com/yuri-li/reactive-system/tree/main/vue3-demo/dev-tools/rx-crud/core-test)
