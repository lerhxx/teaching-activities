const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/data');

const UserSchema = new Schema({
	name: String,
	pwd: String
})

const articleSchema = new Schema({
	title: String,
	aim: String,
	time: Date,
	address: String,
	unit: String,
	explain: String,
	cover: String,
	content: String
})

const Models = {
	User: mongoose.model('User', UserSchema),
	Artical: mongoose.model('Artical', articleSchema)
}

db.on('error', () => {
	console.error('Database connection error.');
})

db.on('open', () => {
	console.log('The database has connected.')
})

module.exports = Models;