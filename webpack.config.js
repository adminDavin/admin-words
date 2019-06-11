const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    index: "./src/admin-words/script/index.js"
   },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html?$/, loader: 'html-loader' },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
    modules: ["node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "words-admin",
      filename: "index.html",
      template: "./src/admin-words/index.html",
      chunks: ['react', 'react-dom', 'manifest', 'index']
    }),
    new webpack.ProvidePlugin({ //它是一个插件，所以需要按插件的用法new一个
      react: 'react',    //接收名字:模块名
    })
  ],
  optimization: {  //优化
    runtimeChunk: {
      "name": "manifest"
    },
    splitChunks: {
      cacheGroups: {//缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        react: {
          test: /[\\/]node_modules[\\/]react[\\/]/,
          chunks: "initial",
          minChunks: 1,
          name: "react",
          priority: 10,
          enforce: true
        },
        reactDom: {
          test: /[\\/]node_modules[\\/]react-dom[\\/]/,
          chunks: "initial",
          minChunks: 1,
          name: "react-dom",
          priority: 9,
          enforce: true
        }
      }
    }
  },
  mode: "development",
  devtool: "source-map",
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    host: "localhost",
    compress: true,
    port: "3000",
    proxy: {
      "/admin": {
        target: "http://localhost:8080/words-admin/",
        secure: false
      },
      "/pdf-store": {
        target: "http://localhost:8080/words-admin/admin/downloadFile",
        secure: false,
        pathRewrite: {
          "^/pdf-store": ""
        }
      }
    }
  }
};