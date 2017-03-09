const express = require('express');
const api = require('./api');
const bodyParser = require('body-parser');
const db = require('./db');
const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const app = module.exports = express();

app.set('port', (process.env.port || 3002));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
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