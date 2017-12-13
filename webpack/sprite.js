const spritesmithPlugin = require('webpack-spritesmith');
const path = require('path');

module.exports = function() {
    return {
		resolve: {
			modules: ["node_modules", "source"]
		},    	
    	plugins: [
            new spritesmithPlugin({
                src: {
                    cwd: path.resolve(__dirname, '../source/images'),
                    glob: '*.png'
                },
                target: {
                    image: path.resolve(__dirname, '../source/images/sprites/sprite.png'),
                    css: path.resolve(__dirname, '../source/sass/sprite.scss')                 
                },
                apiOptions: {
                    cssImageRef: "~sprite/sprite.png" 
                }
            })
    	]
    }        
}