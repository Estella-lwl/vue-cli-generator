# vue-cli-generator
- 第三方库👉🏻 [commander](https://github.com/tj/commander.js)
- 使用 ejs 模板引擎

## 实现功能：

- 创立项目模板
- 自动安装依赖
- 自动运行服务
- 展示在新的浏览器tab页
- 使用指令生成各模块的模板文件



## 使用
```
一些说明：
  使用 -d [your target path] 可指定目标路径
  例：`custom addpage HomePage -d src`  将生成于项目根目录下的src文件夹。
```
- 新建项目：custom create [your project name]
- 新建组件：
  - 默认：custom addcpn [your project name]
  - 自定义路径：custom addcpn [component name] -d [your target path]
- 新建页面 & 对应路由：
  - 默认：custom addpage [page name]
  - 自定义路径：custom addpage [page name] -d [your target path]
- 新建store模块：
  - 默认：custom addpage [store name]
  - 自定义路径：custom addpage [store name] -d [your target path]


