const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/wordsAdmin/script/index.js',
    print: './src/wordsAdmin/script/utils/utils.js',
    another: './src/wordsAdmin/script/components/infoComponent/another-module.js',
    demo: './src/wordsAdmin/script/components/infoComponent/async-demo.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'wordsAdmin'
    }),
    // new webpack.ProvidePlugin({
    //   _: 'lodash'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};