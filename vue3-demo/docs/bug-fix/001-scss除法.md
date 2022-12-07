# 1 scss代码与错误

```
transform: rotate(360deg / 10);
```

```
DEPRECATION WARNING: Using / for division is deprecated and will 
be removed in Dart Sass 2.0.0.
```

# 2 错误描述

Sass最新的规范不允许使用"/"，理由是，会跟css的语法混淆。

按照官网的解释，修改后的代码如下：

```
@use "sass:math";
transform: rotate(math.div(360deg / 10));
```

或者，改为calc，如下：

```
transform: rotate(calc(360deg / 10));
```

# 3 解决方案

我的理解是，语法规则应该足够简洁。

所以，将sass的版本降级为`1.32.13`

```
"sass": "1.32.13",
```




