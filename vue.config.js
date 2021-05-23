module.exports = {
    lintOnSave: false, // 关掉代码校验
    devServer: {
        disableHostCheck: true,
    },
    configureWebpack: {
        resolve: {
            //配置路径别名
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
};