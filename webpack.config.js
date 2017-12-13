const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const js = require('./webpack/babel.js');
const sprite = require('./webpack/sprite');


const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index/index.js',
            'products': PATHS.source + '/pages/products/products.js'
        },
        devtool: 'source-map',
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        resolve: {
            modules: ["node_modules", path.resolve(__dirname, 'source/components/aside')],            
            alias: {
                'sprite': path.resolve(__dirname, 'source/spritesmith/'),
                'img': path.resolve(__dirname, 'source/img/'),
                'fonts': path.resolve(__dirname, 'source/fonts/')
                // ,
                // 'sass': path.resolve(__dirname, 'source/sass/')
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/pages/index/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'products.html',
                chunks: ['products', 'common'],
                template: PATHS.source + '/pages/products/products.pug'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
    pug(),
    images(),
    fonts()
]);

module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            extractCSS(),
            js()
            // ,
            // uglifyJS({useSourceMap: true})
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            devserver(),
            js(),
            css(),
            sass()            
        ]);
    }
};










