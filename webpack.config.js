const path = require('path');

module.exports = {
  entry: './static/js/sidebar.jsx',
  mode: 'development',
  watchOptions: {
    poll: true,
    ignored: /node_modeules/
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};