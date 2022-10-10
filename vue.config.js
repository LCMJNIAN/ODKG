module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",    //打包的目标目录
  assetsDir: "static",
  indexPath: 'index.html',
  //图标修改
  pwa: {
    iconPaths: {
        favicon32: 'favicon.ico',
        favicon16: 'favicon.ico',
        appleTouchIcon: 'favicon.ico',
        maskIcon: 'favicon.ico',
        msTileImage: 'favicon.ico'
    }
},
    // 关闭线上源码
    chainWebpack: (config) => {
      config.module.rules.delete("svg"); 
    },
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.svg$/,
            loader: "vue-svg-loader",
          },
        ],
      },
    },
      devServer: {
       disableHostCheck:true,
       port:5000,
       host:'0.0.0.0',
       https:false,
       open:false,
       proxy:{
        'api':{
          target: 'http://0.0.0.0//:5000',
          changeOrigin: true,
          pathRewrite: {
              '^/api': "/"
          }
        }
       }
    },
}