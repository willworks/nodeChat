# nodeChat  

 - A web application for  Instant messaging and chatting  based on node and websocket  
 - 基于node和socket.io的网页版即时聊天程序  
 - 在线地址 : http://112.74.83.68:8080

---

# Install  

 - npm install express --save  
 - npm install socket.io --save  

---

# Error  

 - 在此解决方案中一次生成一个项目。若要启用并行生成，请添加“/m”开关  
 - MSBUILD : error MSB3428: 未能加载 Visual C++ 组件“VCBuild.exe”  
 - 要解决此问题<br />
	1) 安装 .NET Fram ework 2.0 SDK  
	2) 安装 Microsoft Visual Studio 2005   
	3) 如果将该组件安装到了其他位置，请将其位置添加到系统路径中  

---

# Reason    

 - my point was that you don't need Visual Studio 2005 -- the message about the .NET Framework 2 SDK is misleading  
   You just need MSBuild and the C++ compiler, which come along with the Windows SDK I gave you the link to (or by installing a later version of Visual Studio that work on Win8) http://msdn.microsoft.com/en-us/windows/desktop/hh852363.aspx  
   I'm on Win8 / VS2012 and building native code through npm is not a problem  
 - 我也找了半天，我机器上装的是vs2012，就是转换可能会有问题，从2008到2012更新的强制指定吧，比如用vs2012：npm config set msvs_version 2012 --global  
 - This looks like an issue with building socket.io, specifically the ws package that it depends on, based on the log.However, this is more of a core Node / gyp issue anyhow.. and I think the error message may be a red herring. You should just be able to install the Windows SDK from here and you'll be good to go  
 - 参考github：https://github.com/karma-runner/karma/issues/536  
 - 所以最终可能的问题是socket.io需要重新用node-gyp编译，而node-gyp依赖于python和msvc和msframeworks  
 - 安装node-gyp环境要求 https://github.com/TooTallNate/node-gyp/blob/master/README.md  

---

# Solution  

 - 安装node-gyp编译必须的环境python (必须是2.7.X)  
 - Visual Studio (不一定是错误提示里的2005)，并且强制指定：npm config set msvs_version 2012 --global  

---

# Usage  

## client  

		var socket = io.connect(host,options);
			io.on

			当socket与后端成功建立连接后
			-> connect : socket.on('connect',function(){});

			当socket正在与服务器建立连接
			-> connecting : socket.on('connecting',function(){});

			当与服务器断开连接
			-> disconnect : socket.on('disconnect',function(){});

			当与服务器连接失败
			-> connect_failed : socket.on('connect_failed',function(){});

			当一个错误发生而且不能被处理
			-> error : socket.on('error',function(){});

			通过send方法发送到服务器端，并且被服务器接受并返回到客户端接受后处理的数据
			-> message : socket.on('message',function(message,[callback]){});

			可以是任意事件，除了保留的事件之外
			-> anything : socket.on('anything',function(data,[callback]){});

			socket再次连接失败
			-> reconnect_failed : socket.on('reconnect_failed',function(){});

			重新连接并且成功
			-> reconnect : socket.on('reconnect',function(){});

			重新连接还在连接中..
			-> reconnecting : socket.on('reconnecting',function{});

 

## server  

		var io = require('socket.io');
			io.on

			初始化一个socket
			->connection : io.on('connection',function(socket){});

			接受客户端send()方法发送过来服务器的数据
			->message : io.on('message',function(message,callback){});

			除了库保留的事件外任意自定义事件
			->anything : io.on('anything',function(data){});

			中断socket连接
			->disconnect : io.on('disconnect',function(){});

---

# Github autoDeployment  

Github为每个仓库(repository)都可以设置一个或多个自己专属的钩子，且每个钩子都可以设置独立的触发事件(Events)  
当有push代码的时候，Github会POST一个请求到设置的服务器地址(Payloads URL)  
服务器通过监测POST，校验参数，就可以执行shell脚本进行git pull更新代码  

具体参考[Github autoDeployment](https://github.com/willworks/autoDeployment)