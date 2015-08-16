window.onload = function(){
	var socket = io();
	var form = document.getElementsByTagName('form')[0];
	console.log(form);
	var m = document.getElementById('m');
	form.submit = function(){
		socket.emit('chat message', m.value);
		console.log(m.value);
		m.value = '';
		return false;
	}
	// socket.on('chat message', function(msg){
	// $('#messages').append($('<li>').text(msg));
	// });
}
