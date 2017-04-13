const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;
const article = require('../json/article.json');
const footerLink = require('../json/footer-link.json');
const search = require('../json/search.json');
const academy = require('../json/academy.json');
const user = require('../json/user.json');
const config = require('./config');
const crypto = require('crypto');

mongoose.Promise = Promise;

mongoose.connect(config.db);

const selectTypeSchema = new Schema({
	type: String,
	index: String
})

const AcademySchema = new Schema({
	name: String,
	index: Number,
	staff: [selectTypeSchema]
})

const userSchema = new Schema({
	name: String,
	pwd: String,
	rank: Number,
	faculty: String,
	title: String
})

userSchema.pre('save', function(next) {
	let content = this.pwd;
	let sha = crypto.createHash('sha256');
	sha.update(content);
	this.pwd = sha.digest('hex');
	next();
})

//TODO
//引用参与者
const articleSchema = new Schema({
	url: String,
	author: String,
	title: String,
	abs: String,
	time: Date,
	startTime: Date,
	endTime: Date,
	address: String,
	unit: String,
	explain: String,
	content: String,
	enclosure: String,
	faculty: String,
	type: String,
	participator: [String]
})

const footLinkSchema = new Schema({
	url: String,
	text: String
})

const searchSchema = new Schema({
	name: String,
	index: Number
})

const totalSchema = new Schema({
	articalTotal: Number,
	userTotal: Number
})

const sessionSchema = new Schema({
	sessionId: String,
	user: Object
})

// const commentSchema = new Schema({
// 	id: String,
// 	time: Date,
// 	commnet: String
// })

const Models = {
	User: mongoose.model('User', userSchema),
	Article: mongoose.model('Article', articleSchema),
	FootLink: mongoose.model('FootLink', footLinkSchema),
	Search: mongoose.model('Search', searchSchema),
	Academy: mongoose.model('Academy', AcademySchema),
	Sessions: mongoose.model('Sessions', new Schema({})),
	initialized: false
}

Models.Article.total = 79;

let articalNum = article.articles.length,
	userNum = user.length;

const initialize = () => {
	Models.Sessions.find(null, (err, doc) => {
		if(err) {
			console.error(err);
		}else if(!doc.length) {
			console.log('Database opens for the first time...')
			//TODO
			// article.articles.map(item => new Models.Article(item).save());
			// user.map(item => new Models.User(item).save());
			new Models.Sessions({}).save();
			// footerLink.map(item => new Models.FootLink(item).save());
			// search.map(item =>new Models.Search(item).save());
			// academy.map(item =>new Models.Academy(item).save());
			// console.log(academy)
			// Models.Article.find(null, (err, doc) => {
			// 	if(err) {
			// 		return console.error(err)
			// 	}
			// 	console.log(doc)
			// })
		}else {
			Models.Sessions.find(null, (err, doc) => {
				// doc.map(item => item.remove()) 
				// Models.Sessions.find(null, (err, doc) => {
				// 	console.log(doc)
				// })
			})
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

module.exports = Models
