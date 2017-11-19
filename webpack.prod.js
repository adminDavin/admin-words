const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = merge(common, {

  output: {
    filename: 'script/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "MyLibrary"
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),

    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})