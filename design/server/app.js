const express = require('express');
const session = require('express-session');
const api = require('./api');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const resolve = file => path.resolve(__dirname, file);
const app = module.exports = express();

const stroe = 

app.set('port', (process.env.port || 3002));
app.use(session({
	stroe: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: 24 * 60 * 60
	}),
	saveUninitialized: false,
	secret: 'auto',
	cookie: {
		maxAge: 24 * 60 * 60 * 1000
	}
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(api);

app.get('*', (req, res) => {
	const fileName = 'index.html';
	const html = fs.readFileSync(resolve('../' + fileName), 'utf-8');
	res.send(html);
});



app.listen(app.get('port'), () => {
	console.log("Express server listening at localhost:%s", app.get('port'));
});