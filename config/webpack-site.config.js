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
    }),
    new HtmlWebpackPlugin({
      filename: './urun-13.html',
      template: path.join(__dirname, '../site/src/urun-13.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-14.html',
      template: path.join(__dirname, '../site/src/urun-14.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-15.html',
      template: path.join(__dirname, '../site/src/urun-15.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-16.html',
      template: path.join(__dirname, '../site/src/urun-16.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-17.html',
      template: path.join(__dirname, '../site/src/urun-6.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-18.html',
      template: path.join(__dirname, '../site/src/urun-18.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-19.html',
      template: path.join(__dirname, '../site/src/urun-19.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-20.html',
      template: path.join(__dirname, '../site/src/urun-20.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-21.html',
      template: path.join(__dirname, '../site/src/urun-21.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-22.html',
      template: path.join(__dirname, '../site/src/urun-22.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-23.html',
      template: path.join(__dirname, '../site/src/urun-23.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-24.html',
      template: path.join(__dirname, '../site/src/urun-24.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-25.html',
      template: path.join(__dirname, '../site/src/urun-25.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-26.html',
      template: path.join(__dirname, '../site/src/urun-26.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-27.html',
      template: path.join(__dirname, '../site/src/urun-27.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-28.html',
      template: path.join(__dirname, '../site/src/urun-28.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-29.html',
      template: path.join(__dirname, '../site/src/urun-29.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-30.html',
      template: path.join(__dirname, '../site/src/urun-30.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-31.html',
      template: path.join(__dirname, '../site/src/urun-31.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-32.html',
      template: path.join(__dirname, '../site/src/urun-32.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-33.html',
      template: path.join(__dirname, '../site/src/urun-33.html'),
      bundle: []
    }),
    new HtmlWebpackPlugin({
      filename: './urun-34.html',
      template: path.join(__dirname, '../site/src/urun-34.html'),
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
