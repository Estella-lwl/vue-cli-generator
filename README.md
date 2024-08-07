# vue-template-generator
Start a Vue3 project in a moment.

## 实现功能：

- 创立项目模板
- 自动安装依赖
- 自动运行服务
- 展示在新的浏览器tab页
- 使用指令生成各模块的模板文件
- 可指定生成路径

## 使用
安装
<pre style="color: #5b89fe;"><code>
npm i start-vue -g
</code></pre>

查看命令
<pre style="color: #5b89fe;"><code>st</code></pre>

使用命令
<pre style="color: #5b89fe;"><code>st [command]</code></pre>
<br>

#### 新建指令
- 新建项目：
  <pre style="color: #5b89fe;"><code>
  st create [your project name]</code></pre>
<br>

- 新建组件：
  - 默认路径：
  <pre style="color: #5b89fe;"><code>
  st addcpn [your project name]
  </code></pre>

  - 自定义路径： 
  <pre style="color: #5b89fe;"><code>
  st addcpn [component name] -d [your target path]
  </code></pre>
<br>

- 新建页面 & 对应路由：
  - 默认路径： 
  <pre style="color: #5b89fe;"><code>
  st addpage [page name]
  </code></pre>

  - 自定义路径：
  <pre style="color: #5b89fe;"><code>
  st addpage [page name] -d [your target path]
  </code></pre>
<br>

- 新建store模块：
  - 默认路径：
  <pre style="color: #5b89fe;"><code>
  st addstore [store name]
  </code></pre>

  - 自定义路径： 
  <pre style="color: #5b89fe;"><code>
  st addstore [store name] -d [your target path]
  </code></pre>

<br>

> **一些说明：**
>  - 使用 <code style="color: #5b89fe;b">-d [your target path]</code> 的后缀可指定目标路径；
>    - 例： <code style="color: #5b89fe;">st addpage HomePage -d src</code> 将在项目根目录下的 src 文件夹生成 HomePage 页面。
<br>
