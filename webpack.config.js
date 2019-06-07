const path = require('path');

module.exports = {
  entry: {
    main: './static/js/homepage_render.jsx',
    headlines_emotion: './static/js/headlines_by_emotion_render.jsx',
    headlines_language: './static/js/headlines_by_language_render.jsx',
    source_stats: './static/js/source_stats_render.jsx',
    headlines_category: './static/js/headlines_by_category_render.jsx',
    article: './static/js/article_render.jsx',
    todays_headlines: './static/js/todays_headlines_render.jsx'
  },
  mode: 'development',
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
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
      },
      {
        test: /.css$/,
        loader: 'style-loader'
      },
      {
        test: /.css$/,
        use: [{
           loader: 'css-loader',
        }],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};