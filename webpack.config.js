/**
 * Website
 *
 * Site description
 *
 * Author:  Anshul Kharbanda
 * Created: -- -- --
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// Environment
var ENV = process.env.NODE_ENV || 'development';

// Webpack module
module.exports = {
    entry: './app/main.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
            { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader'] },
            { test: /\.(svg|jpg|jpeg|png)$/, loader: 'url-loader' },
            { test: /\.html$/, loader: 'html-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            filename: 'index.html',
            template: 'app/resources/html/' + ENV + '.index.html',
            chunks: []
        })
    ]
}
