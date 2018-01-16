
module.exports = function() {
    return {
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
				options: {
					presets: [
                      'babel-polyfill',  
                      'es2015',
                      ['env', {
                        'targets': {
                            'browsers':['last 5 versions', 'ie >= 9']                            
                        }
                      }],
                      'es2015-ie',
                      'stage-3'
                    ]
				}
            }]
        }
    }
}