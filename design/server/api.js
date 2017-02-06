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

module.exports = router;