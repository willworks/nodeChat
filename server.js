/**
发送事件的代码为：socket.emit(action, data, function)，其中action为事件的名称，data为数据，function为回调函数;
处理事件代码 为：socket.on(action,function)，如果emit发送的时候有数据data，则function中参数包含了这个数据。
*/

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
var users=[];//保存所有在线用户的名称

// 设置静态资源获取路径
app.use('/', express.static(__dirname + '/client'));
// express路由功能，定向访问
app.get('/', function(req, res){
	res.sendfile('index.html');
});

// 初始化一个socket connection : io.on('connection',function(socket){});
io.on('connection', function(socket){
	// 监听login事件
	socket.on('login', function(userName){
		if(users.indexOf(userName) > -1){
			//将已存在用户名的信息回复给客户端
			socket.emit('nameExisted');
		}
		else{
			//将用户名保存在users[]数组里
			socket.userIndex = users.length;
		    socket.userName = userName;
		    users.push(userName);
		    socket.emit('loginSuccess');
		    console.log(userName);
		    //前边加上了io. 表示对象为全局，向所有连接到服务器的客户端发送当前登陆用户的昵称 
		    io.sockets.emit('system', userName); 
		}
	});
});

http.listen(8080, function(){
	console.log('listening on *:8080');
});

