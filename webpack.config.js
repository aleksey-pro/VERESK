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
const lintJS = require('./webpack/js.lint');
const MD5HashPlugin = require('md5-hash-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build'),
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index/index.js',
            'products': PATHS.source + '/pages/products/products.js',
        },
        devtool: 'eval',
        output: {
            path: PATHS.build,
            filename: 'js/[name].js',
            chunkFilename: '[chunkhash].[id].chunk.js',
        },
        resolve: {
            modules: ['node_modules', path.resolve(__dirname, 'source')],        
            alias: {
                'sprite': path.resolve(__dirname, 'source/spritesmith/'),
                'img': path.resolve(__dirname, 'source/img/'),
                'fonts': path.resolve(__dirname, 'source/fonts/'),
                'scss': path.resolve(__dirname, 'source/sass/'),
            },
        },
        plugins: [
            new MD5HashPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/pages/index/index.pug',
            }),
            new HtmlWebpackPlugin({
                filename: 'products.html',
                chunks: ['products', 'common'],
                template: PATHS.source + '/pages/products/products.pug',
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChunks: 3,
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
        ],
    },
    pug(),   
    images(),
    fonts(),
]);

module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            extractCSS(),
            js(),            
            // uglifyJS(),
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            devserver(),
            js(),
            // lintJS({ paths: PATHS.sources}),
            css(),
            sass(),       
        ]);
    }
};
