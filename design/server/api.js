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
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: links});
		}
	})
})

router.get('/getSearchLists', (req, res) => {
	db.Search.find(null, (err, lists) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: lists[0]});
		}
	})
})

router.put('/signin', (req, res) => {
	let {id, pwd} = req.body;
	db.User.findOne({id}, (err, user) => {
		switch(true) {
			case !!err:
				res.send({state: 1, msg: '查询失败！'});
				break;
			case !user:
				res.send({state: 2, msg: '账号不存在!'});
				break;
			case user.pwd === pwd:
				res.send({state: 0, data: {id: id, rank: user.rank}});
				break;
			case user.pwd !== pwd:
				res.send({state: 3, msg: '密码错误!'});
				break;
			default:
				res.send({state: 4, msg: '未知错误!'});
		}
	})
})

router.post('/user/edit/:id', (req, res) => {
	db.Article.find({title: req.body.form.title, author: req.body.form.author}, (err, doc) => {
		if(doc.length) {
			res.send({state: 1, msg: '标题已存在！'});
		}else {
			db.Article.create(req.body.form, (err, article) => {
				if(err) {
					res.send({state: 2, msg: '发布失败，请重试！'});
				}
				// db.Article.find({title: req.body.form.title}, (err, doc) => {
				// 	if(err) {
				// 		console.log(err);
				// 	}
				// 	console.log(doc);
				// })
				res.send({state: 0, data: {id: article._id}});
			})
		}
	})
})

router.get('/article/:id', (req, res) => {
	db.Article.find({_id: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 2, msg: '查询失败！'})
		}
		if(doc.length) {
			res.send({state: 0, data: doc});
		}else {
			res.send({state: 1, msg: '文章不存在！'});
		}
	})
})

router.get('/article/:id/edit', (req, res) => {
	db.Article.find({_id: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'})
		}
		if(!doc.length) {
			res.send({state: 2, msg: '文章不存在！'})
		}else {
			res.send({state: 0, data: doc[0]})
		}
	})
})

router.get('/user/:id/articles', (req, res) => {
	console.log(req.params.id)
	db.Article.find({author: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 2, msg: '查询失败！'})
		}
		if(doc.length) {
			res.send({state: 0, data: doc});
		}else {
			res.send({state: 1, msg: '文章不存在！'});
		}
	})
})

router.get('/user', (req, res) => {
	db.User.find({id: req.query.id}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '操作失败'});
		}
		if(!doc.length) {
			res.send({state: 2, msg: '账号不存在'});
		}else {
			res.send({state: 0, data: {id: doc[0].id, rank: doc[0].rank}});
		}
	})
})
router.get('/getArticals', (req, res) => {
	if(req.query.faculty != 0 || req.query.type != 0) {
		if(req.query.faculty == 0) {
			db.Article.find({type: req.query.type}, (err, doc) => {
				cb(err, doc)
			})
		}else if(req.query.type == 0) {
			db.Article.find({faculty: req.query.faculty}, (err, doc) => {
				cb(err, doc)
			})
		}else {
			db.Article.find({faculty: req.query.faculty, type: req.query.type}, (err, doc) => {
				cb(err, doc)
			})
		}
	}else if(req.query.faculty == 0 && req.query.type == 0)  {
		db.Article.find((err, doc) => {
			cb(err, doc)
		})
	}
	function cb(err, doc) {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: doc});
		}
	}
})

module.exports = router;