const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: "node",
  entry: {
    index: path.join(__dirname, "src", 'index'),
    hits: path.join(__dirname, "src", 'hits'),
  },
  watch: false,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "[name].js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader"
        }
      ]
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.ts']
  },
  devtool: 'none',
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
};