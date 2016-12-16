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
			test: /\.scss$/,
			exclude: /node_modules/,
			loaders: ["style", "css", "sass"]
		}, {
			test: /\.js$/,
			loader: 'babel?presets=es2015',
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|gif)$/,
			exclude: /node_modules/,
			loader: 'file?name=[name].[ext]?[hash]'
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