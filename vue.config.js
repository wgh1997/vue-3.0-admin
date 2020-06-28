const webpack = require('webpack')
const environment = require('./build/environment')
var path = require('path')
// import baseURL from './src/config/baseUrl'
// console.log(baseURL, "basUrl2")
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        './' : '/',
    configureWebpack: config => {
        console.log(config, "开发生产共同")
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production'
            // 为生产环境修改配置...
            console.log(config, "生产环境")
        } else {
            config.mode = 'development'

            // 为开发环境修改配置...
            console.log(config, "开发环境")
        }
    },
    devServer: {
        //host: '127.0.0.1',
        port: 8983,
        open: true, // 在浏览器当中打开项目。
        https: false,
        hotOnly: false,
        proxy: { // 设置代理
            '/api': {
                target: 'http://192.168.95.100:8983',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        disableHostCheck: true
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.STAGE': JSON.stringify(environment.stage),
                'process.env.LOCAL_URL': JSON.stringify(environment.localUrl)
            })
        ]
    },

}