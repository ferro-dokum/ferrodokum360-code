const path = require('path')
const webpack = require('webpack')
const pkg = require('../package')

const now = new Date()
const banner = `
 Copyright (c) 2020 ${pkg.author}

 Date: ${now.toISOString()}
`

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '../build'),
    filename: `${pkg.name}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [new webpack.BannerPlugin(banner)],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
