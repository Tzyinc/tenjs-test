let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ReplacePlugin = require('replace-bundle-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style'),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
  ],
  devtool: 'source-map',
  devServer: {
    port: process.env.PORT || 8080,
  },
};
