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
				res.send({state: 0, data: {id: id, rank: user.rank, faculty: user.faculty}});
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
	db.Article.findOne({title: req.body.form.title, author: req.body.form.author}, (err, doc) => {
		if(err) {
			res.send({state: 3, msg: '操作失败'});
		}else if(doc) {
			res.send({state: 1, msg: '标题已存在！'});
		}else {
			db.Article.create(req.body.form, (err, article) => {
				if(err) {
					res.send({state: 2, msg: '发布失败，请重试！'});
				}
				res.send({state: 0, data: {id: article._id}});
			})
		}
	})
})

router.put('/user/edit/:id', (req, res) => {
	let form = req.body.form;
	db.Article.findByIdAndUpdate(req.body.id, {$set: {
		url: form.url,
		author: form.author,
		title: form.title,
		abs: form.abs,
		time: form.time,
		heldTime: form.heldTime,
		endTime: form.endTime,
		address: form.address,
		unit: form.unit,
		explain: form.explain,
		content: form.content,
		enclosure: form.enclosure,
		faculty: form.faculty,
		type: form.type
	}}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '操作失败'});
		}else {
			res.send({state: 0, data: {id: doc._id}});
		}
	})
})

router.get('/article/:id', (req, res) => {
	db.Article.findById({_id: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 2, msg: '查询失败！'})
		}
		// console.log(doc)
		if(doc) {
			res.send({state: 0, data: doc});
		}else {
			res.send({state: 1, msg: '文章不存在！'});
		}
	})
})

router.delete('/article/:id', (req, res) => {
	db.Article.remove({_id: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '操作失败！'})
		}else {
			res.send({state: 0, msg: '删除成功！'});
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
			res.send({state: 0, data: {id: doc[0].id, rank: doc[0].rank, faculty: doc[0].faculty}});
		}
	})
})
router.get('/getArticals', (req, res, next) => {
		let faculty = req.query.faculty,
		type = req.query.type,
		time = req.query.time;
	if(time == 0) {
		if(faculty == 0) {
			if(type == 0) {
				next('route');
			}else {
				db.Article.find({type: type}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})

			}
		}else {
			if(type == 0) {
				db.Article.find({faculty: faculty}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}else {
				db.Article.find({faculty: faculty, type: type}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})

			}
		}
	}else {
		next();
	}
}, (req, res, next) => {
	let faculty = req.query.faculty,
		type = req.query.type,
		time = req.query.time,
		now = new Date();
	if(time == 1) {
		if(faculty == 0) {
			if(type == 0) {
				db.Article.find({endTime: {$gt: now}}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}else {
				db.Article.find({type: type, endTime: {$gt: now}}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}
		}else {
			if(type == 0) {
				db.Article.find({faculty: faculty, endTime: {$gt: now}}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}else {
				db.Article.find({faculty: faculty, type: type, endTime: {$gt: now}}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}
		}
	}else {
		next();
	}
}, (req, res, next) => {
	let faculty = req.query.faculty,
		type = req.query.type,
		time = req.query.time,
		now = new Date();
	if(time == 2) {
		if(faculty == 0) {
			if(type == 0) {
				db.Article.find({endTime: {$lt: now}}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}else {
				db.Article.find({type: type, endTime: {$lt: now}}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}
		}else {
			if(type == 0) {
				db.Article.find({faculty: faculty, endTime: {$lt: now}}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}else {
				db.Article.find({faculty: faculty, type: type, endTime: {$lt: now}}, (err, doc) => {
					if(err) {
						res.send({state: 1, msg: '查询失败！'});
					}else {
						res.send({state: 0, data: doc});
					}
				})
			}
		}
	}else {
		next();
	}
})
router.get('/getArticals', (req, res) => {
	db.Article.find((err, doc) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: doc});
		}
	})
})
router.get('/user/info', (req, res) => {
	db.User.find((err, doc) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: doc});
		}
	})
})

module.exports = router;