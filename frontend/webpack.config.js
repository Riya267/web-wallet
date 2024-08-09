const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');

require('dotenv').config({ path: './.env' });

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    mode: isProduction ? 'production' : 'development',
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    devServer: {
      compress: true,
      port: 9000,
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
  };
};
