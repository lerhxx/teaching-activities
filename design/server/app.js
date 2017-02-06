const express = require('express');
const routes = require('./server/routes');
const bodyParser = require('body-parser');
const db = require('./db');
const app = module.exports = express.createServer();

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/dist'))
})

app.get('/', routes.index);
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.setting.env);