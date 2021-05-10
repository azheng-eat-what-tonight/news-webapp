# news（一个综合新闻类 web app 应用（学习））

> 由于这个学期课程安排，要做一个 webapp 应用软件，而我负责前端部分，在初期决定使用 vue 框架进行开发，但是对于前端很多的知识并不清楚，用了大量的时间学习 h5、css、js，加上一些事情的耽误，学完 vue 基础知识后学期已经过了大半。
> 这是在掌握上述基础知识后，从网上找到一个适合的教程，做一个针对 vue+vant 的一个练习，为之后项目的具体实现做准备 。
> 教程地址（https://www.yuque.com/lipengzhou/toutiao-mobile-vue）

### Project setup 2021.5.19 23.30

新建代码仓库

##### 初始目录结构

> .
> ├── node_modules 第三方包存储目录
> ├── public 任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack。
> │ ├── favicon.ico 浏览器收藏夹图标
> │ └── index.html 单页面 HTML 文件
> ├── src
> │ ├── assets 公共资源目录，放图片等资源
> │ ├── components 公共组件目录
> │ ├── router Vue Router 路由模块
> │ ├── store Vue 容器模块
> │ ├── views 视图组件存储目录，所有的路由页面都存储到这里
> │ ├── App.vue 根组件，最终被替换渲染到 index.html 页面中 #app 入口节点
> │ └── main.js 整个项目的启动入口模块
> ├── .browserslistrc 指定了项目的目标浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀
> ├── .editorconfig EditorConfig 帮助开发人员定义和维护跨编辑器（或 IDE）的统一的代码风格。
> ├── .eslintrc.js ESLint 的配置文件
> ├── .gitignore Git 的忽略配置文件，告诉 Git 项目中要忽略的文件或文件夹
> ├── README.md 说明文档
> ├── babel.config.js Babel 的配置文件
> ├── package-lock.json 记录安装时的包的版本号，以保证自己或其他人在 npm install 时大家的依赖能保证一致
> └── package.json 包说明文件，记录了项目中使用到的第三方包依赖信息等内容

### Project Begin 2021.5.10 0.54

##### 对项目结构进行初始化（去除 VueCLI 自带的部分文件，新建自身所需的文件结构）

删除默认示例文件：

    * src/views/About.vue
    * src/views/Home.vue
    * src/components/HelloWorld.vue
    - src/assets/logo.png

创建以下内容：

    - src/api 目录，存储接口封装
    - src/utils 目录，存储一些工具模块
    - src/styles 目录，存储样式资源
    - index.less 文件，存储全局样式 -在 main.js 中加载全局样式 import './styles/index.less'

增删后

> 1.  ├── public
> 2.  │ ├── favicon.ico
> 3.  │ └── index.html
> 4.  ├── src
> 5.  │ ├── api 存储 API 请求模块
> 6.  │ ├── router Vue Router 路由模块
> 7.  │ ├── store Vuex 容器模块
> 8.  │ ├── styles 存储全局样式资源目录
> 9.  │ ├── utils 存储工具模块
> 10. │ ├── views 存储视图组件
> 11. │ ├── App.vue 根组件
> 12. │ └── main.js 入口模块
> 13. ├── .browserslistrc
> 14. ├── .editorconfig
> 15. ├── .eslintrc.js
> 16. ├── .gitignore
> 17. ├── README.md
> 18. ├── babel.config.js
> 19. ├── package-lock.json
> 20. └── package.json

---

### Project Begin 2021.5.10 18.00

##### 安装项目所需插件已经配置基础路由和请求

移动端组件库(vant)

> youzan/vant 目前还在更新维护中，官方地址(https://vant-contrib.gitee.io/vant/#/zh-CN/)
> 导入 vant
>
> - npm i vant -S
>
> 本项目采用 rem 适配布局
>
> 引入组件( postcss-pxtorem / lib-flexible )
>
> postcss-pxtorem(将 px 转为 rem 单位)
>
> - npm install postcss-pxtorem@5.1.1(指定版本)
> - 项目根目录下创建 postcss.config.js 文件，写入如下配置
>
> > ```javascript
> > module.exports = {
> >   plugins: {
> >     "postcss-pxtorem": {
> >       rootValue: 37.5, //默认像素为375
> >       propList: ["*"],
> >     },
> >   },
> > };
> > ```
>
> lib-flexible(设定 rem 基准值)
>
> - npm i amfe-flexible
> - 在 main.js 中引用即可

字体图标（阿里矢量图标库 / vant 自带图标）

> 阿里图标库 (https://www.iconfont.cn/)
> vant 自带图标(https://vant-contrib.gitee.io/vant/#/zh-CN/icon)

配置路由界面(/login | / | /home | /video | /my | qa)

> 首先在 views 文件夹下创建对应界面（控件)。
> 由于 web app 底端菜单栏相同，所以创建公用控件(views->layout)，使用 vant 的< van-tabbar >实现该功能。
> 在 routers--->index.js 文件下写路由表（/login，/ (component 为 layout) 以及它的子路由/home /qa /videos /my)
> 在 van-tabbar-item 中写入 to="/xx" ，完成初步路由表配置。

封装请求模块(axios) //并不是很会这个模块

> 在 src/utils/request.js 创建文件，写入
>
> ```
> /** 封装 axios 请求模块 */
> import axios from "axios"
>
> const request = axios.create({
>   baseURL: "http://ttapi.research.itcast.cn/" // 基础路径
> })
> export default request
> ```
>
> ```
> end
> ```