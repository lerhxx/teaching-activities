var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		app: ['./src/app.js'],
		main: ['./src/main.js']
	},
	output: {
		path: path.resolve(__dirname, './dist/js'),
		publicPath: '/dist/',
		filename: '[name].js'
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
			test: /\.(png|jpg|gif|svg)$/,
			exclude: /node_modules/,
			loader: 'url?limit=8192'
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
	},
	devServer: {
		inline: true,
		hot: true,
		'/get': {
			target: 'localhost:3000',
			secure: false
		}
	}
}