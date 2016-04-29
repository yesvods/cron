var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, "app/index.js")
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: "bundle.js",
    publicPath: "http://localhost:3000/static/"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"],
    alias: {
      cmp: path.join(__dirname, 'app/component')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
      {
        test: /\.s[c|a]ss$/,
        loader: 'style!css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]' 
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=8192'
      },
    ],
  },
  // postcss: function(){
  //   return [precss, autoprefixer]
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.ProvidePlugin({
      "React": "react",
      "ReactDOM": "react-dom",
      "_": "lodash",
      "cx": "classnames",
      "request": "superagent"
    }),
    function(){
      this.plugin('done', stats => {
        var json = stats.toJson();
        if (json.errors.length > 0) {
          json.errors.forEach(error => {
            console.log("\x07" + error);
          });
        } else if (json.warnings.length > 0) {
          json.warnings.forEach(warning => {
            console.log(warning)
          });
        } else {
          console.log(stats.toString({
            chunks: false,
            colors: true
          }));
        }
      })
    }
  ]
}