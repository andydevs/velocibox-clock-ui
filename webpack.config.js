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
const ENV = process.env.BUILD_ENV || 'development'

// Webpack module
module.exports = {
    entry: './app/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
        publicPath: ( ENV === 'production' ? `/${project.name}/` : '/' )
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
            template: 'app/resources/html/index.html'
        })
    ]
}
