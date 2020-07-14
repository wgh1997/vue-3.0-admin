
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?'./' : '/',
    outputDir:'dist',//打包的时候生成的一个文件名
    // lintOnSave:false,//是否开启eslint保存检测 ,它的有效值为 true || false || 'error'\
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production'
            // 为生产环境修改配置...
            console.log('为生产环境修改配置...')
            //清除console
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            //开启Gzip压缩
            //打开nginx文件夹下的nginx.conf文件，在http模块中写入以下内容
            // # 开启gzip
            // gzip on;
        
            // # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
            // gzip_min_length 1k;
        
            // # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
            // gzip_comp_level 2;
        
            // # 进行压缩的文件类型。javascript有多种形式，后面的图片压缩不需要的可以自行删除
            // gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
        
            // # 是否在http header中添加Vary: Accept-Encoding，建议开启
            // gzip_vary on;
        
            // # 设置压缩所需要的缓冲区大小     
            // gzip_buffers 4 16k;
            const plugins = [];
            if (IS_PROD) {
                plugins.push(
                    new CompressionWebpackPlugin({
                        filename: "[path].gz[query]",
                        algorithm: "gzip",
                        test: productionGzipExtensions,
                        threshold: 10240,
                        minRatio: 0.8
                    })
                );
            }
            config.plugins = [...config.plugins, ...plugins];
            
        } else {
              // 为开发环境修改配置...
            config.mode = 'development'
              console.log('为开发环境修改配置...')
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
   
}