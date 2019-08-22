// Imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
require("@babel/register");

const config = {
  entry: './src/index.jsx',

  output: {
    path: path.resolve(__dirname, '../static'),
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../static/index.html')
    })
  ]
};// Exports
module.exports = config;
