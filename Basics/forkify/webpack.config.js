const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js', './src/sass/main.scss'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin(
            
             { patterns:[
            {
                from: path.resolve(__dirname, './src/img/favicon.png'),
                to:path.resolve(__dirname, 'dist'), 
            },
            {
                from: path.resolve(__dirname, './src/img/icons.svg'),
                to:path.resolve(__dirname, 'dist'),
              },
              {
                from: path.resolve(__dirname, './src/img/logo.png'),
                to:path.resolve(__dirname, 'dist'),
              }
        ]}),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),

        
    ],
module: {
    rules:[





        {
            test: /\.js/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },



        {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },



          {
            test: /\.(png|jpg|svg|gif)$/i,
            use: ['file-loader'],
        },
        {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ['file-loader']
        },
        // {
        //     test: /\.html$/,
        //     loader: 'html-loader',
        // }
    ]
},

  };