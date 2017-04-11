const express = require('express');
const router = express.Router();
const db = require('./db');
const fs = require('fs');
const path = require('path');
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
	db.Academy.find(null, (err, lists) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: lists});
		}
	})
})
// 获取首页教研室类型
router.get('/getFacultiesLists/:id', (req, res) => {
	db.Academy.findOne({index: req.params.id}, (err, doc) => {
		// console.log(doc)
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: doc.staff});
		}
	})
})
// 登录
router.post('/signin', (req, res) => {
	let {id, pwd} = req.body;

	db.User.findOne({id}, (err, user) => {
		// console.log(user)
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
// 登出
router.get('/signout', (req, res) => {
})
// 创建文章
router.post('/edit/create', (req, res) => {
	db.Article.findOne({title: req.body.form.title, author: req.body.form.author}, (err, doc) => {
		if(err) {
			res.send({state: 3, msg: '操作失败'});
		}else if(doc) {
			res.send({state: 1, msg: '标题已存在！'});
		}else {
			// let reg = {
			// 		img: new RegExp('<img', 'gi'),
			// 		src: new RegExp('src=', 'i'),
			// 		quote: new RegExp('[\"\']')
			// 	},
			// 	preContent = req.body.form.content,
			// 	r = reg.img.exec(preContent),
			// 	imgs = [];
			// while(r) {
			// 	// console.log(r.index)
			// 	// console.log(reg[0].lastIndex)
			// 	let start = r.input.indexOf('src=') + 5;
			// 	preContet = r.input.slice(start);
			// 	let end = reg.quote.exec(preContet).index;
			// 	let img = r.input.slice(start, start + end);
			// 	// console.log(start);
			// 	// console.log(end);
			// 	// console.log(img);
			// 	preContet = preContet.slice(end + 1);
			// 	// let url = reg.src.exec(r.input);
			// 	// console.log(r.input.indexOf('src='))
			// 	console.log(r.input.length)
			// 	// console.log(preContet)
			// 	// preContent = 
			// 	r = reg.img.exec(preContent);
			// 	console.log(r)
			// }
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
		// console.log(doc)
		if(doc) {
			// console.log(doc.startTime)
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
	// console.log(req.params);
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

	if(params.tab == 0) {
		db.Article.find({participator: {$in: [params.id]}, $and: [{startTime: {$gt: sTime}}, {startTime: {$lt: eTime}}]}, (err, doc) => {
				// console.log(doc)
				if(err) {
					res.send({state: 1, msg: '查询失败！'})
				}else {
					let count = filter(doc);
					res.send({state: 0, data: count})
				}
		})
	}else if(params.tab == 1) {
		db.Article.find({faculty: {$in: [params.id]} ,$and: [{startTime: {$gt: sTime}}, {startTime: {$lt: eTime}}]}, (err, doc) => {
				if(err) {
					res.send({state: 1, msg: '查询失败！'})
				}else {
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
// 获取用户信息
router.get('/userManage/info', (req, res) => {
	db.User.find((err, doc) => {
		if(err) {
			res.send({state: 1, msg: '查询失败！'});
		}else {
			res.send({state: 0, data: doc});
		}
	})
})
// 添加用户
router.post('/userManage/add', (req, res) => {
	dbUser.create(req.body, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: '操作失败'})
		}else {
			res.send({state: 0, data: doc})
		}
	})
})

// router.post('/upload', (req, res) => {
// 	// console.log(req.body)
// 	res.end()
// })

// 修改用户
router.post('/userManage/modify', (req, res) => {
	// console.log(req.body)
	db.User.update({id: req.body.id}, {$set: {pwd: req.body.newPwd}}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: err})
		}else {
			res.send({state: 0, msg: '修改成功！'})
		}
	})
})

//TODO
// 删除用户
router.delete('/userManage/delete/:id', (req, res) => {
	// console.log(req.body)
	db.User.remvoe({id: req.body.id}, (err, doc) => {
		if(err) {
			res.send({state: 1, msg: err})
		}else {
			res.send({state: 0, msg: '删除成功！'})
		}
	})
})

// 获取统计单位可选项
router.get('/count/unitText', (req, res) => {
	db.Academy.find({index: req.query.faculty}, (err, doc) => {
		console.log(doc)
		if(err) {
			res.send({state: 1, msg: err})
		}else {
			res.send({state: 0, data: doc[0].staff})
		}
	})
})

module.exports = router;
//TODO
//登出