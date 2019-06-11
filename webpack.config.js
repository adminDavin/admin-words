const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  // context: path.resolve(__dirname, 'src'),
  entry: {
    index: "./src/admin-words/script/index.js"
   },
  output: {
    path: __dirname + "/dist",
    filename: "[name]-[chunkhash:6].js",
    publicPath: '/dist'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html?$/, loader: 'html-loader' },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ],
  },
  resolve: {
    enforceExtension: false,
    extensions: [
      ".js", ".json", ".jsx"
    ],
    modules: ["node_modules", path.resolve(__dirname, 'src/admin-words/script')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "words-admin",
      filename: "index.html",
      template: "./src/admin-words/index.html"
    }),
    new webpack.ProvidePlugin({ //它是一个插件，所以需要按插件的用法new一个
      react: 'react',    //接收名字:模块名
    })
  ],

  // devtool: 'source-map', // 开发模式
  devtool: 'inline-source-map', //生产模式
  devServer: {
    // 配置服务与热更新
    contentBase: './dist', // 监听哪个目录下启动热更新
    hot: true,
    host: "localhost", // 服务地址 192.168.0.106本地
    compress: true, // 服务器端的压缩，开启
    port: "3000", // 端口号
    proxy: {
      "/admin": {
        target: "http://localhost:8080/words-admin/",
        secure: false
        // pathRewrite: { "^/api": "" }
      },
      "/pdf-store": {
        target: "http://localhost:8080/words-admin/admin/downloadFile",
        secure: false,
        pathRewrite: {
          "^/pdf-store": ""
        }
      }
    }
  },
  optimization: {  //优化
    splitChunks: {
      cacheGroups: {//缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          minChunks: 1,
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  watchOptions: {
    // 实时打包更新
    poll: 1000, // 每1s时间就检测文件是否修改，修改了就自动帮我们打包
    // aggregeateTimeout: 500, // 设置的是我们连续按Ctrl+S保存时，500毫秒内只执行打包一次
    ignored: /node_modules/ // 这个文件夹不监视
  }
};
