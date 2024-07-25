const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  // devtoool: 'inline-source-map',
  output: {
    path: path.resolve('dist', 'assets'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        resolve: {
            fullySpecified: false,
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack'
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      }
    ]
  },
  externals: {
    zendesk_app_framework_sdk: 'ZAFClient'
  },
  watchOptions: {
    poll: 1000
  },
  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '../', flatten: true },
        { from: 'src/zcli.apps.config.json', to: '../', flatten: true },
        { from: 'src/translations/*', to: '../translations', flatten: true },
        { from: 'src/images/*', to: '.', flatten: true }
      ]
    }),

    new HtmlWebpackPlugin({
      template: 'src/iframe.html',
      filename: 'iframe.html',
      hash: true
    }),

    new Dotenv()
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}
