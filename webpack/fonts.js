module.exports = function(paths) {
	return {
		module: {
			rules: [
				{
					test: /\.(eot|ttf|otf|woff|woff2)$/,
					include: paths,
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]'
					},
				},
			],
		},
	};
};
