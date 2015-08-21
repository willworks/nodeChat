/** 
    Document   : nodeChat
    Created on : 2015.8
    Author     : Kevin Zhong
    License    : MIT
    github     : https://github.com/willworks/nodeChat/ 
    Description: 基于node和socket.io的网页版即时聊天程序
    Copyright (c) 2015 Kevin Zhong
*/
/**
发送事件的代码为：socket.emit(action, data, function)，其中action为事件的名称，data为数据，function为回调函数;
处理事件代码 为：socket.on(action,function)，如果emit发送的时候有数据data，则function中参数包含了这个数据。
socket.io客户端常用函数
    var socket = io.connect(host,options);
        io.on

        当socket与后端成功建立链接后
        -> connect : socket.on('connect',function(){});

        socket正在与服务器建立链接
        -> connecting : socket.on('connecting',function(){});

        当与服务器断开链接s
        -> disconnect : socket.on('disconnect',function(){});

        与服务器链接失败
        -> connect_failed : socket.on('connect_failed',function(){});

        当一个错误发生而且不能被处理
        -> error : socket.on('error',function(){});

        通过send方法发送到服务器端，并且被服务器接受并返回到客户端接受后处理的数据
        -> message : socket.on('message',function(message,[callback]){});

        可以是任意事件，除了保留的事件之外
        -> anything : socket.on('anything',function(data,[callback]){});

        socket再次链接失败
        -> reconnect_failed : socket.on('reconnect_failed',function(){});

        重新链接并且成功
        -> reconnect : socket.on('reconnect',function(){});

        重新链接还在链接中..
        -> reconnecting : socket.on('reconnecting',function{});
*/

// 页面内包括图片的所有元素加载完毕后执行nodeChat实例化和初始化
window.onload = function(){
	// 实例化nodeChat
	var nodechat = new nodeChat();
	nodechat.init();
}

// 定义nodeChat类
var nodeChat = function(){
	// js是引用赋值，故赋予null初始化 这块涉及到闭包变量的销毁
	this.socket = null;
}

// 向原型添加业务方法
nodeChat.prototype = {
	// 初始方法：初始界面切换+连接服务器
    init: function() {
    	// 保存当前this，函数对象到that，避免使用过程中this发生变化，例如到了局部变量变成自己本身而不是全局
        var that = this;
        // 获取元素保存在变量里，减少每次使用重新查找时候的性能损耗
        var wait = document.getElementById('wait');
        var login = document.getElementById('login');
        var name = document.getElementById('name');
        var btn = document.getElementById('loginBtn');
		var loginWrapper = document.getElementById('loginWrapper');
		var send = document.getElementById('btn'); // 发送按钮
        var clear = document.getElementById('clear'); // 清空按钮
		var msg = document.getElementById('msg');
        var getMsg = document.getElementById('getMsg');
        // 建立到服务器的socket连接
        this.socket = io.connect();


        // 监听socket的connect事件，此事件表示连接已经建立
        // connect : socket.on('connect',function(){});表示与后端建立连接后
        this.socket.on('connect', function() {
            // 连接到服务器后， 改变遮罩层的样式，显示昵称输入框
         	wait.textContent = "What's your name? :)";
        	login.style.display = 'block';
        	name.focus();// 文本框输入聚焦
            // 绑定确认用户名的按钮事件
            btn.onclick = function(){
                // 上述声明赋值
            	var userName = name.value;
            	// 名字不为能空
            	if(userName.trim().length != 0){
            		// 此处若还使用this，则对象变成btn
            		// 自定义事件login，发送到server
            		that.socket.emit('login' , userName);
            	}
            	else{
					alert('Your name should not be empty!');
					wait.textContent = "What's your name? :)";
					name.focus();
            	}
            }// END 绑定确认用户名的按钮事件
        });// END this.socket.on


        // 接收处理用户名被占用事件
		this.socket.on('nameExisted', function() {
		// 显示昵称被占用的提示
			wait.textContent = 'name is taken, choose another please!'; 
		});


        // 接收处理登陆成功事件
		this.socket.on('loginSuccess', function() {
		// 隐藏遮罩，进入nodeChat主界面
			loginWrapper.style.display= 'none';
			msg.focus();
			// 获取输入框信息并且随事件发送到服务器
            send.onclick = function(){
                // 获取信息发送窗口信息
                var userMsg = msg.value;
                // 发送message时间和获取到的信息
                that.socket.emit('message', userMsg); 
                // 将发送窗口清空
                msg.value = '';
            }
            // 清空聊天窗口
            clear.onclick = function(){
                var elm = document.getElementById('getMsg');
                while(elm.firstChild){ // 判断是否有子节点,如果有，则默认删除第一个子节点，直到全部清空
                    elm.removeChild(elm.firstChild);
                }
            }
		});

        // 处理服务器自动发出的提示信息
        this.socket.on('system', function(name, userCount, type) {
             // 判断用户是连接还是离开以显示不同的信息
             var msg = name + (type == 'login' ? ' joined' : ' left');
             // 调试用：控制台输出显示系统提示信息
             // console.log(msg);
             // 创建新的子代，显示系统信息
             var p = document.createElement('p');
             p.textContent = msg;
             document.getElementById('getMsg').appendChild(p);
             // 显示在线人数
             document.getElementById('userNum').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
         });

        // 处理服务器回调的所有聊天信息
        // name从服务器端传来用户名参数
        this.socket.on('chat', function(name, userMsg){
            // 调试用：控制台输出显示聊天信息
            // console.log(userMsg);
            // 创建新的子代，显示聊天信息
            var p = document.createElement('p');
            var time = new Date();
            // 调试用：控制台输消息发送时间
            // console.log(time);
            p.textContent = name + '[' + time + ']' + userMsg;
            document.getElementById('getMsg').appendChild(p);
            // 滚动条一直默认滚动到底部，显示最新聊天信息
            getMsg.scrollTop = getMsg.scrollHeight; 
        });


        /**按键检测，将按键事件绑定到msg信息发送窗口，只要检测到键盘按键按下，就触发事件
        msg.onkeydown = function(){
        	alert('hello');
        }
        */
        // 点击就即enter按键发送信息
        msg.onkeydown = function(){
        	var e = e || window.event; 
        	var keycode = e.which ? e.which : e.keyCode; 
        	if(keycode == 13 || keycode == 108){
        		send.click();
        		this.value = '';
        	}
        }

        // enter发送名字到服务器
        name.onkeydown = function(){
        	var e = e || window.event; 
        	var keycode = e.which ? e.which : e.keyCode; 
        	if(keycode == 13 || keycode == 108){
        		btn.click();
        		this.value = '';
        	}
        }

    }
};