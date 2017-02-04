let express = require('express'),
	routes = require('./server/routes');
let app = module.exports = express.createServer();

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/dist'))
})

app.get('/', routes.index);
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.setting.env);