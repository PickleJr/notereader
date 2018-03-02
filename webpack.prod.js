const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJS = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config');

module.exports = merge(config, {
    plugins: [
        new UglifyJS({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});