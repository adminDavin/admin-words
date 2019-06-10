const ExtractTextPlugin = require("extract-text-webpack-plugin");

const moduleRules = {
  rules: [
    {
      test: /\.jsx|js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react", "stage-0"],
          plugins: ["transform-class-properties"]
        }
      }
    },
    {
      test: /\.(jpe?g|png|gif)$/i, //to support eg. background-image property
      loader: "file-loader",
      query: {
        name: "[name].[ext]",
        outputPath: "images/"
      }
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff",
      query: {
        outputPath: "style/"
      }
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader",
      query: {
        outputPath: "style/"
      }
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"]
      })
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader"]
      })
    }
  ]
};

module.exports = moduleRules;
