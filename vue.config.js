const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // '@':'/src',
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/global.scss";`
            }
        }
    },
    productionSourceMap: false,
    publicPath: './'
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/production-sub-path/'
    //     : '/'

    //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
    // chainWebpack: config => {
    //     config.plugin('html')
    //         .tap(args => {
    //             args[0].title = "平台";
    //             return args;
    //         })
    // },
}