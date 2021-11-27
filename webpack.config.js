const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: "node",
  entry: path.join(__dirname, "src", 'index'),
  watch: false,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "index.js",
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