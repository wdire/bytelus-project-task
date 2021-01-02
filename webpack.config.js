
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
  entry: ["babel-polyfill", APP_PATH],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      "jquery":"jquery/dist/jquery.js",
      "jquery-ui": "jquery-ui/ui/widgets",
		  "jquery-ui-css": "jquery-ui/../../themes/base",
      modules: path.join(__dirname, "node_modules"),
    }
  },

  module: {
    rules: [
      { 
        test: /\.(ts|js)x?$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ , 
        options:{
          cacheDirectory:true
        }
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: path.join(APP_PATH, 'index.html') }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.ProvidePlugin({
      "$":"jquery",
      "jQuery":"jquery",
      "window.jQuery":"jquery"
    }),
  ],

  performance: {
    hints: false
  },

  devServer: {
    host:"0.0.0.0",
    open: true,
    openPage:"http://localhost:3000",
    port:3000,
  },
};
