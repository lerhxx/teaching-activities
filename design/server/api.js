const express = require('express');
const router = express.Router();
const db = require('./db');
const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

const fn = () => {};
router.get('/getFooterLink', (req, res) => {
	db.FootLink.find(null, (err, links) => {
		if(err) {
			console.error(err);
		}else {
			res.send(links);
		}
	})
})

router.get('/getSearchLists', (req, res) => {
	db.Search.find(null, (err, lists) => {
		if(err) {
			console.log(err);
		}else {
			res.send(lists[0]);
		}
	})
})

router.get('/getArticals', (req, res) => {
	db.Article.find(null, (err, lists) => {
		if(err) {
			console.log(err);
		}else {
			res.send(lists);
		}
	})
})

router.post('/signin', (req, res) => {
	let {id, pwd} = req.body;
	db.User.findOne({id}, (err, user) => {
		switch(true) {
			case !!err:
				console.log(err);
				break;
			case !user:
				res.send({state: 1, msg: '账号不存在!'});
				break;
			case user.pwd === pwd:
				res.send({state: 0, msg: '登录成功!', id: id});
				break;
			case user.pwd !== pwd:
				res.send({state: 2, msg: '密码错误!'});
				break;
			default:
				res.send({state: 3, msg: '未知错误!'});
		}
	})
})

router.post('/user/edit/:id', (req, res) => {
	db.Article.find({title: req.body.form.title, author: req.body.form.author}, (err, doc) => {
		if(doc.length) {
			res.send({state: 1, msg: '标题已存在！'});
		}else {
			db.Article.create(req.body.form, (err) => {
				if(err) {
					res.send({state: 2, msg: '发布失败，请重试！'});
				}
				// db.Article.find(null, (err, doc) => {
				// 	if(err) {
				// 		console.log(err);
				// 	}
				// 	console.log(doc);
				// })
			})
			res.send({state: 0, msg: '发布成功！'});
		}
	})
})

router.get('article/:id/:title', (req, res) => {
	console.log(req.params);
	res.end()
	// db.Article.find({author: req.params})
})

module.exports = router;