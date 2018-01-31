
module.exports = function() {
    return {
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
				options: {
					presets: [
                      // 'babel-polyfill',  
                      'es6-shim',
                      'es2015',
                      ['env', {
                        'targets': {
                            'browsers':['last 5 versions', 'Explorer 11', 'last 4 Edge versions'],                      
                        }, 'useBuiltIns': true
                      }],
                      'es2015-ie',
                      'stage-3',
                    ],
                    plugins: ['babel-plugin-transform-es2015-arrow-functions', 'babel-preset-env', 'babel-preset-es2015-ie']
				}                
            }]
        }
    }
}