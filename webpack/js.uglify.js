const webpack = require('webpack');
module.exports = function() {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                ie8: true,
                compress: {
                    warnings: false,
                }
            })
        ]
    };
};

