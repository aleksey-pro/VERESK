
module.exports = function() {
    return {
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
				options: {
					presets: ['es2015', 'babel-preset-env', 'stage-3']
				}
            }]
        }
    }
}