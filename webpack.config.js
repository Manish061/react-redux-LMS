var path = require('path');
var webpack = require('webpack');
const env = require('./config/env');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './build',
        port: 9090
    },
    devtool: 'eval-source-map',
    entry: './src/js/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&url=false',
                    'sass?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                ]
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
            ,
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                }            }
        ]
    },
    output: {
        path: 'build',
        filename: 'js/bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin(env)
    ]
};
