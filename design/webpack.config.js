var webpack = require('webpack');
var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith');

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
			// loader: 'url?limit=8192'
			loader: 'file'
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
<<<<<<< HEAD
	},
	plugins:[
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve(__dirname, 'src/imgs/icons'),
				glob: '*.png'
			},
			target: {
				image: path.resolve(__dirname, 'src/imgs/sprite.png'),
				css: path.resolve(__dirname, 'src/css/sprite.styl')
			},
			apiOptions: {
				cssImageRef: '~sprite.png'
			}
		})
	]
=======
	}
>>>>>>> dev
}