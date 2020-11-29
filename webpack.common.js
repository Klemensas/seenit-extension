const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: 'public/', to: '../' },
    ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      SERVER_API: 'http://localhost:9000',
    }),
  ],
  entry: {
    popup: path.join(__dirname, 'src/popup/index.tsx'),
    eventPage: path.join(__dirname, 'src/eventPage.ts'),
    content: path.join(__dirname, 'src/content/index.tsx'),
    seenitContent: path.join(__dirname, 'src/content/seenitContent.tsx'),
    iframeContent: path.join(__dirname, 'src/content/iframeContent.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // Creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // Translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // Compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
        test: /\.(graphql|gql)$/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
};
