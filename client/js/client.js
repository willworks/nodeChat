/**
发送事件的代码为：socket.emit(action, data, function)，其中action为事件的名称，data为数据，function为回调函数;
处理事件代码 为：socket.on(action,function)，如果emit发送的时候有数据data，则function中参数包含了这个数据。
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


//向原型添加业务方法
nodeChat.prototype = {
	//初始方法：初始界面切换+连接服务器
    init: function() {
    	// 保存当前this，函数对象到that，避免使用过程中this发生变化，例如到了局部变量变成自己本身而不是全局
        var that = this;
        //获取元素保存在变量里，减少每次使用重新查找时候的性能损耗
        var wait = document.getElementById('wait');
        var login = document.getElementById('login');
        var name = document.getElementById('name');
        var btn = document.getElementById('loginBtn');
		var loginWrapper = document.getElementById('loginWrapper');
		var send = document.getElementById('btn');
		var msg = document.getElementById('msg');

        //建立到服务器的socket连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已经建立
        //connect : socket.on('connect',function(){});表示与后端建立连接后
        
        this.socket.on('connect', function() {
            // 连接到服务器后， 改变遮罩层的样式，显示昵称输入框
         	wait.textContent = "What's your name? :)";
        	login.style.display = 'block';
        	name.focus();// 文本框输入聚焦
            // 绑定确认用户名的按钮事件
            btn.onclick = function(){
            	var userName = name.value;
            	// 名字不为能空
            	if(userName.trim().length != 0){
            		//此处若还使用this，则对象变成btn
            		//自定义事件login，发送到server
            		that.socket.emit('login' , userName);
            	}
            	else{
					alert('Your name should not be empty!');
					wait.textContent = "What's your name? :)";
					name.focus();
            	}
            }// END 绑定确认用户名的按钮事件
        });// END this.socket.on

		this.socket.on('nameExisted', function() {
		//显示昵称被占用的提示
			wait.textContent = 'name is taken, choose another please!'; 
		});

		this.socket.on('loginSuccess', function() {
		//显示昵称被占用的提示
			loginWrapper.style.display= 'none';
			msg.focus();


			信息传输，有待增加
			//获取输入框信息并且随事件发送到服务器
			// var userMsg = msg.value;
			// that.socket.emit("message",userMsg);
		});
    }
};