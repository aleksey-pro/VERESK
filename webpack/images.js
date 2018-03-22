module.exports = function() {
    return {
        module: {
            rules: [{
              test: /\.(png|jpe?g|svg)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: 'images/[name].[ext]'
                  },
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 65
                    },
                    // optipng.enabled: false will disable optipng
                    optipng: {
                      enabled: true,
                    },
                    pngquant: {
                      quality: '65-90',
                      speed: 4
                    }
                  }
                },
              ],
            }]
        },
    };

};