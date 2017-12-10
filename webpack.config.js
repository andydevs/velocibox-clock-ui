/**
 * Velocibox Clock UI
 *
 * Site description
 *
 * Author:  Anshul Kharbanda
 * Created: 11 - 28 - 2017
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const project = require('./package.json')

// Environment
const ENV = process.env.NODE_ENV || 'development'

// Webpack module
module.exports = {
    entry: './app/main.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: (ENV === 'production' ? `/${project.name}/` : '/')
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
            template: 'app/resources/html/index.html',
        })
    ]
}
