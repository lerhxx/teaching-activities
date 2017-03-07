const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;
const article = require('../json/article.json');
const footerLink = require('../json/footer-link.json');
const search = require('../json/search.json');
const user = require('../json/user.json');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/design');


const UserSchema = new Schema({
	id: String,
	pwd: String,
	rank: Number,
	faculty: Number,
	title: String
})

const articleSchema = new Schema({
	url: String,
	author: String,
	title: String,
	abs: String,
	time: Date,
	heldTime: String,
	endTime: Date,
	address: String,
	unit: String,
	explain: String,
	content: String,
	enclosure: String,
	faculty: String,
	type: String,
})

const footLinkSchema = new Schema({
	url: String,
	text: String
})

const selectTypeSchema = new Schema({
	type: String,
	index: Number
})

const searchSchema = new Schema({
	faculties: [selectTypeSchema],
	types: [selectTypeSchema]
})

const Models = {
	User: mongoose.model('User', UserSchema),
	Article: mongoose.model('Article', articleSchema),
	// List: mongoose.model('List', listSchema),
	FootLink: mongoose.model('FootLink', footLinkSchema),
	Search: mongoose.model('Search', searchSchema),
	initialized: false
}

const initialize = () => {
	Models.User.find(null, (err, doc) => {
		if(err) {
			console.error(err);
		}else if(!doc.length) {
			console.log('Database opens for the first time...')
			//TODO
			// article.articles.map(item => new Models.Article(item).save());
			// footerLink.map(item => new Models.FootLink(item).save());
			// new Models.Search(search).save();
			user.map(item => new Models.User(item).save());
			// Models.Article.find(null, (err, doc) => {
			// 	if(err) {
			// 		return console.error(err)
			// 	}
			// 	console.log(doc)
			// })
		}else {
			// Models.User.find(null, (err, doc) => {
			// 	// doc.map(item => item.remove())
			// 	console.log(doc)
			// })
			Models.initialized = true;
		}
	})
}

db.on('error', () => {
	console.error('Database connection error.');
})

db.on('open', () => {
	console.log('The database has connected.')
	initialize();
})

module.exports = Models;