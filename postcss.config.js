// postcss.config.js
/**
 * PostCss 的配置文件
 * PostCss 是基于 Node.js 运行的一个处理 CSS 的工具
 */

// PostCss 的配置文件需要导出一个对象
module.exports = {
    // 配置要使用的相关插件
    plugins: {

        // // 自动添加浏览器厂商声明前缀，用来兼容不同浏览器
        // // Vue-Cli 已经内置默认配置了
        // autoprefixer: {
        //     // browsers 用来要兼容到的系统（浏览器）环境
        //     // .browserslistrc 已经配置兼容环境的信息了
        //     browsers: ['Android >= 4.0', 'iOS >= 8.0']
        // },
        // 把 px 转为 rem
        'postcss-pxtorem': {
            // 转换的根元素的基准值
            // 根据设计稿，宽为X 值为 x/15
            // Vant 组件库基于 375 宽为基准(逻辑像素)(iphone 6/7/8)
            rootValue: 37.5,

            // 需要转换的 CSS 属性， * 就是所有的属性都要转换 font，padding等
            propList: ['*'],
        },
    },
}