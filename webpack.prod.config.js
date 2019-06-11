const devConfig = require("./webpack.config");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(devConfig, {
  mode: "production",
  devtool: 'inline-source-map',
});
