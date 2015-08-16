/**
* 创建一个简单的服务器
var http = require('http');
var server = http.createServer(
	function(req,res){
		res.writeHead(200,{
			'Conetnt-Type':'text/plain'
		});
		res.write('hello world!');
		res.end();
	}
)
server.listen(80);
console.log('server is listening port:80');
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// 设置静态资源获取路径
app.use('/', express.static(__dirname + '/client'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

