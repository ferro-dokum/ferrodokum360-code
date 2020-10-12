const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '../site/src/index.js'),
  output: {
    path: path.join(__dirname, '../site/dist'),
    filename: 'bundle[hash].js'
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.join(__dirname, '../site/src/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: './urun-1.html',
      template: path.join(__dirname, '../site/src/urun-1.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-2.html',
      template: path.join(__dirname, '../site/src/urun-2.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-3.html',
      template: path.join(__dirname, '../site/src/urun-3.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-4.html',
      template: path.join(__dirname, '../site/src/urun-4.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-5.html',
      template: path.join(__dirname, '../site/src/urun-5.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-6.html',
      template: path.join(__dirname, '../site/src/urun-6.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-7.html',
      template: path.join(__dirname, '../site/src/urun-7.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-8.html',
      template: path.join(__dirname, '../site/src/urun-8.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-9.html',
      template: path.join(__dirname, '../site/src/urun-9.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-10.html',
      template: path.join(__dirname, '../site/src/urun-10.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-11.html',
      template: path.join(__dirname, '../site/src/urun-11.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-12.html',
      template: path.join(__dirname, '../site/src/urun-12.html'),
      bundle: []
    })
  ],
  resolve: {
    extensions: ['.html', '.js', '.jsx']
  },
  devServer: {
    port: 3001
  },
  devtool: 'source-map'
}
