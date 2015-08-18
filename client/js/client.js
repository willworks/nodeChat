window.onload = function(){
	// 实例化nodeChat
	var nodechat = new nodeChat();
	nodechat.init();
}

// 定义nodeChat类别
var nodeChat = function(){
	this.socket = null;
}


//向原型添加业务方法
nodeChat.prototype = {
    init: function() {//此方法初始化程序
        var that = this;
        //建立到服务器的socket连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已经建立
        this.socket.on('connect', function() {
            //连接到服务器后，显示昵称输入框
            document.getElementById('wait').textContent = "What's your name? :)";
            document.getElementById('login').style.display = 'block';
            document.getElementById('name').focus();
            console.log('Connected successfully!');
        });
    }
};