const express = require('express');
const router = express.Router();
const db = require('./db');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const resolve = file => path.resolve(__dirname, file);

const fn = () => {};
//获取页脚信息
router.get('/getFooterLink', (req, res) => {
	db.FootLink.find(null, (err, links) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: links});
		}
	})
})
// 获取首页文章类型
router.get('/getTypeLists', (req, res) => {
	db.Search.find(null, (err, lists) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: lists});
		}
	})
})
// 获取首页学院信息
router.get('/getAcademyLists', (req, res) => {
	if(req.query.id) {
		db.Academy.find({index: req.query.id}, (err, lists) => {
			if(err) {
				res.send({state: 1, msg: '查询失败！'});
			}else {
				res.send({state: 0, data: lists});
			}
		})
	}else {
		db.Academy.find(null, (err, lists) => {
			if(err) {
				res.send({state: 1, msg: '查询失败！'});
			}else {
				res.send({state: 0, data: lists});
			}
		})
	}
})
// 获取首页教研室类型
router.get('/getFacultiesLists/:id', (req, res) => {
	db.Academy.findOne({index: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: doc.staff});
		}
	})
})
// 登录
router.post('/signin', (req, res) => {
	let {account, pwd} = req.body;
	// console.log(pwd)
	console.log(pwd)
	db.User.findOne({account: account}, (err, user) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else if(!user){
			res.send({state: 2, msg: '账号不存在!'});
		}else {
			let hash = crypto.createHash('sha256');
			hash.update(pwd);
			pwd = hash.digest(pwd);
			console.log(pwd)
			console.log(user.pwd)
			if(pwd.toString('hex') === user.pwd) {
				req.session.regenerate((err) => {
				console.log(user)
					if(err) {
						res.send({state: 4, msg: '登录失败，请重新尝试'})
					}else {
						req.session.user = user;
						res.cookie('useraccount', user.account);
						res.send({state: 0, data: {account: account, name: user.name, rank: user.rank, faculty: user.faculty}});
					}
				})
			}else {
				res.send({state: 3, msg: '密码错误!'});
			}
		}
	})
})
// 登出
router.get('/signout', (req, res) => {
			req.session.user = null;
			res.send({state: 0, msg: '登出成功'})
})
// 创建文章
router.post('/edit/create', (req, res) => {
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
// 修改文章
router.put('/edit/modify', (req, res) => {
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
		type: form.type,
		participator: form.participator
	}}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '操作失败'});
		}else {
			res.send({state: 0, data: {id: doc._id}});
		}
	})
})
// 获取修改的文章
router.get('/edit/article/:id', (req, res) => {
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
// 删除文章
router.delete('/edit/delete/:id', (req, res) => {
	db.Article.remove({_id: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '操作失败！'})
		}else {
			res.send({state: 0, msg: '删除成功！'});
		}
	})
})
// 获取文章详情
router.get('/article/:id', (req, res) => {
	db.Article.findById({_id: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 2, msg: '查询失败！'})
		}
		if(doc) {
			res.send({state: 0, data: doc});
		}else {
			res.send({state: 1, msg: '文章不存在！'});
		}
	})
})

// 获取个人发布文章
router.get('/articles/user/:id', (req, res) => {
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
// 获取所有文章
router.get('/articles/all', (req, res, next) => {
	console.log(req.query)
	let academy = req.query.faculty.charAt(0),
		faculty = req.query.faculty.charAt(2),
		type = req.query.type,
		obj = {},
		query = '',
		total = 0;
	const size = req.query.pageSize * 1;

	if(academy == 0) {
		if(type != 0) {
			obj.type = type
		}else {
			obj = null;
		}
	}else {
		let faCondition = faculty == 0 ? new RegExp(`^${academy}-`) : req.query.faculty;

		if(type != 0) {
			obj.type = type;
		}

		obj.faculty = faCondition;
	}

	// 查询总量
	db.Article.count(obj, (err, sum) => {
		if(err) {
			res.send({state: 2, msg: '查询失败！'});
		}else {
			total = sum;
			if(total > 0) {
				pagedQuery(obj, req.query.page, size, total, res);
			}else {
				res.send({state: 0, data: {lists: [], total: total}})
			}
		}
	})

})
// 分页查询
function pagedQuery(obj, page, size, total, res) {
	db.Article.find(obj)
		.skip((page - 1) * size)
		.limit(size)
		.sort({startTime: -1})
		.exec((err, doc) => {
			if(err) {
				res.send({state: 1, msg: '查询失败！'});
			}else {
				res.send({state: 0, data: {lists: doc, total: total}});
			}
		})
}
// 统计图表
router.get('/count/:id/:tab/:year/:time', (req, res) => {
	console.log(req.params);
	let params = req.params,
		sTime = new Date(),
		eTime = new Date();
	if(params.time == 0) {
		sTime = new Date(`${params.year}-01-01`);
		eTime = new Date(`${params.year}-12-31`);
	}else if(params.time == 1) {
		sTime = new Date(`${params.year}-01-01`);
		eTime = new Date(`${params.year}-07-01`);
	}else {
		sTime = new Date(`${params.year}-07-01`);
		eTime = new Date(`${params.year * 1 + 1}-01-01`);
	}
	db.Article.find({title: '阿尔法'}, (err, doc) => {
				console.log(doc[0])
		})
	if(params.tab == 0) {
		db.Article.find({participator: {$in: [params.id]}, $and: [{startTime: {$gt: sTime}}, {startTime: {$lt: eTime}}]}, (err, doc) => {
				console.log(doc)
				if(err) {
					res.send({state: 1, msg: '查询失败！'})
				}else {
					let count = filter(doc);
					res.send({state: 0, data: count})
				}
		})
	}else if(params.tab == 1) {
		db.Article.find({faculty: {$in: [params.id]} ,$and: [{startTime: {$gt: sTime}}, {startTime: {$lt: eTime}}]}, (err, doc) => {
				console.log(doc.length)
				if(err) {
					res.send({state: 1, msg: '查询失败！'})
				}else {
					console.log(doc[0])
					let count = filter(doc);
					res.send({state: 0, data: count})
				}
		})
	}
})

 /*
 * @method filter: 过滤图表数据
 * @param {Array} doc: Article Entity
 * @return {Array} [{
 * 						startTime: String,   活动开始时间
 * 						type: String    活动信息类型
 * 					}]
 */
function filter(doc) {
	if(doc.length === 0) {
		return {};
	}
	let result = [];

	doc.forEach(value => {
		let tmp = {};
		tmp.startTime = value.startTime;
		tmp.type = value.type;
		result.push(tmp);
	})
	return result;
}
// 获取当前用户个人信息
router.get('/userManage/selfInfo', (req, res) => {
	console.log(req.session)
	let account = parseInt(req.query.account)
	if(req.session.user) {
		db.User.findOne({account: account}, (err, user) => {
			if(err) {
				res.send({state: 1, msg: '操作失败'});
			}
			if(!user) {
				res.send({state: 2, msg: '账号不存在'});
			}else {
				res.send({state: 0, data: {account: user.account,name: user.name, rank: user.rank, faculty: user.faculty}});
			}
		})
	}else {
		res.send({state: 3, msg: '未登录'})
	}
})
// 修改密码
router.post('/userManage/modifyPwd', (req, res) => {
	console.log()
	if(req.session.user) {
		if(req.session.user.account != req.body.account) {
			res.send({state:1, msg: '账号异常，请重新登录'})
		}else {
			let hash = crypto.createHash('sha256');
			hash.update(req.body.oldPwd);
			let pwd = hash.digest(req.body.oldPwd);

			if(pwd.toString('hex') != req.session.user.pwd) {
				res.send({state:1, msg: '密码错误，修改失败'})
			}else {
				hash = crypto.createHash('sha256');
				hash.update(req.body.newPwd);
				let newPwd = hash.digest(req.body.newPwd);
				db.User.update({account: req.session.user.account}, {$set: {pwd: newPwd.toString('hex')}}, (err, user) => {
					req.session.user = null;
					res.send({state:0, msg:'修改成功'})
				})
			}
		}

	}else {
		res.send({state:1, msg: '未登录'})
	}
})
// 获取用户信息
router.get('/userManage/info', (req, res) => {
	db.User.find((err, doc) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			doc.forEach(value => {
				//清空pwd，不传递真实pwd
				value.pwd = '';
			})
			res.send({state: 0, data: doc});
		}
	})
})
// 添加用户
router.post('/userManage/add', (req, res) => {
	db.User.create(req.body, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '操作失败'})
		}else {
			res.send({state: 0, data: doc})
		}
	})
})
// 修改用户信息
router.post('/userManage/modify', (req, res) => {
	console.log(req.body)
	db.User.update({_id: req.body._id}, {$set: {
		name: req.body.name,
		account: req.body.account,
		rank: req.body.rank,
		faculty: req.body.faculty,
		title: req.body.title
	}}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: err})
		}else {
			res.send({state: 0, msg: '修改成功！'})
		}
	})
})
// 删除用户
router.delete('/userManage/delete/:id', (req, res) => {
	console.log(req.params.id)
	db.User.remove({account: req.params.id}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: err})
		}else {
	console.log(doc)
			db.User.find(null, (err, users)=> {
				if(err) {
					res.send({state: 1, msg: err})
				}else {
					res.send({state: 0, msg: '删除成功！'})
				}
			})
		}
	})
})

// 获取统计单位可选项
router.get('/count/unitText', (req, res) => {
	db.Academy.find({index: req.query.faculty}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: err})
		}else {
			res.send({state: 0, data: doc[0].staff})
		}
	})
})

module.exports = router;