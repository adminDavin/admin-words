
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    index: "./src/admin-words/script/index.js"
   },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.(jsx|js)?$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
      { test: /\.html?$/, loader: 'html-loader' },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer,
              ]
            }
          },
          {
            loader: require.resolve('sass-loader')
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
        loader: 'file-loader?name=font/[name].[ext]',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          useRelativePath: true,
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix'
      }
    ],
  },
  resolve: {
    enforceExtension: false,
    extensions: [
      ".js", ".json", ".jsx"
    ],
    modules: ["node_modules"],
    alias: {
      common: path.join(__dirname, './src/common'),
      static: path.join(__dirname, './src/static')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "words-admin",
      filename: "index.html",
      template: "./src/admin-words/index.html"
    }),
    new webpack.ProvidePlugin({
      react: 'react',
      common: 'common'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ],
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
