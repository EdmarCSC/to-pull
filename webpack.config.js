const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Fluxo controll Transpickingut Management',
      template: 'index.html',
      filename: 'index.html',
    }),
  ],
  
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};