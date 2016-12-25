var webpack = require('webpack');

module.exports = {
	entry: './src/main.js',
	output: {
		path: './dist',
		publicPath: './dist/',
		filename: 'build.js'
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.styl$/,
			exclude: /node_modules/,
			loaders: ["style", "css", "stylus"]
		}, {
			test: /\.js$/,
			loader: 'babel?presets=es2015',
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|gif)$/,
			exclude: /node_modules/,
			loader: 'url?name=[name].[ext]?[hash]'
		}]
	},
	babel: {
		presets: ['es2015']
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
}