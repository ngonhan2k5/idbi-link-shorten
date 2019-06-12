const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = (env, argv) => {
  const SERVER_PATH = (argv.mode === 'production') ?
    './src/server/server-prod.js' :
    './src/server/server-dev.js'
return ({
    entry: {
      server: SERVER_PATH
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    mode: argv.mode,
    target: 'node',
    // dbLink: 'memcache',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
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
      ]
    },
    plugins: [
      
      new webpack.LoaderOptionsPlugin({
        // test: /\.xxx$/, // may apply this only for some modules
        options: {
          dbLink: 'memcached'
        }
      })
    ]
  })
}