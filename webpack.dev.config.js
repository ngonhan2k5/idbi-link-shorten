const path = require("path")
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

// var ExtractTextPlugin = require('extract-text-webpack-plugin');


// var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],
    error:['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/error.js']
  },
  output: {
    path: path.resolve(__dirname, './dist/public'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: 'development',
  // dbLink: 'memcached',
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [

      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   options: {
      //     emitWarning: true,
      //     failOnError: false,
      //     failOnWarning: false
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      // {
      //   test: /\.st\.css$/,
      //   use: ['style-loader', 
      //   {
      //     loader: 'css-loader',
      //     options: {
      //       importLoaders: 2,
      //       modules: false,
      //       // namedExport: true, // this is  invalid Options ,I find it
      //       camelCase: true,
      //       localIdentName: '[path][name]__[local]--[hash:base64:5]',
      //     },
      //   }]
      // },

      // { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },

      {
        test: /\.css$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              // namedExport: true, // this is  invalid Options ,I find it
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      excludeChunks: ['server', 'error']
    }),
    new HtmlWebPackPlugin({
      template: "./src/html/error.html",
      filename: "./error.html",
      chunks: ['error']
    }),
    //new OpenBrowserPlugin({ url: 'http://localhost:3000' }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),


  ]
}