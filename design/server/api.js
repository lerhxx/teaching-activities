const express = require('express');
const router = express.Router();
const db = require('./db');
const fs = require('fs');

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
	db.List.find(null, (err, lists) => {
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

module.exports = router;