const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
const CleanWebpackPlugin = require('clean-webpack-plugin');

// var pathMap = require('./src/wordsAdmin/main.json');
// var srcDir = path.resolve(process.cwd(), 'src/wordsAdmin');
// var nodeModPath = path.resolve(__dirname, './src/bower_components');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: false,
    inline: true,
    noInfo: true
  },
  entry: {
    app: './src/wordsAdmin/script/index.js',
    print: './src/wordsAdmin/script/utils/utils.js'
  },
  output: {
    filename: 'script/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/wordsAdmin')
      }, {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src/bower_components')]
  },
  resolve: {
    alias: {
      'moment': 'moment/moment.min.js'
    }
  }
};