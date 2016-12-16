var http = require('http'), express = require('express'), app = express();
/* 当访问 "/" 目录的时候 */
app.use("/", express.static(__dirname + '/'));

app.get('/live/userlive/', function(req, res){
	    var options = {
		    hostname: 'cc.163.com',
		    port: 80,
		    path: '/live/userlive/?uids='+req.query.uids,
		    method: 'GET'	
	    };
	    var req = http.request(options, function(mres) {
		    mres.setEncoding('utf8');
		    mres.on('data', function (data) {
		      var data = JSON.parse(data);
		      console.log(data)
		      res.send(data);
		    });
	    });
	    req.on('error', function(e){  
	        console.log('problem with request: ' + e.message);  
	    });  
	      
	    req.end();  
})
/* 创建服务器 */
http.createServer(app).listen('81', function(){
    console.log('启动服务器完成');
});