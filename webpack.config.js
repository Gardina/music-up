var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
"faker", "lodash",
"react",
"react-dom",
"react-input-range",
"react-redux",
"react-router",
"redux",
"redux-form",
"redux-thunk",
]; /*we can have here dependencies which we want to be in vendor.js since dependencies are not updated very often and they will be
     in the browser cash more likely */

module.exports = {
  entry: {
    bundle: './src/index.js', // we want to compile to bundle.js and starting point is index.js file
    vendor: VENDOR_LIBS /* we want to compile into vendor.js all the dependencies listed as VENDOR_LIBS */
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' /*name will be updated dinamicaly taking the key from entry section ('bundle', 'vendor')
                                        chunkhash (hash of content of the file) will change each time bundle or vendor are updated so that browser reload an updated version*/
  },

  module:{
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] //if any duplicate code found it will added to a 'vendor' file
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html' /*it will generate new index.html into src directory
                                  with updated script tags for each
                                  new js file, so we dont have to manually do it
                                  scr/index.html is used as template  */
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) /*react will look for process.env.NODE_ENV if it is equal to PRODUCTION
                                                                     ot DEVELOPMENT. NODE_ENV is set in package.json, by default it is set
                                                                     to development */
    })
  ]
};
