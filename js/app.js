var ws = require('websocket.io');
var server = ws.listen(3000);

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic('static')).listen(8080);

var show = function (control, title, text, delay) {
	var data = {
		command: 'show',
		control: control,
		title: title,
		text: text,
		delay: delay
	};
	send(data);
};

var hide = function (control) {
	var data = {
		command: 'hide',
		control: control
	};
	send(data);
};

var send = function (data) {
	console.log(data);
	for (var i in server.clients) {
		server.clients[i].send(JSON.stringify(data));
	}
};

$(function () {
	$('.show').click(function (e) {
		console.log(this);
		var control = $(this).parent().attr('id');
		var title = $(this).parent().find('input').val();
		var text = $(this).parent().find('textarea').val();
		console.log('show', control, title, text);
		show(control, title, text, null);
	});
	$('.hide').click(function (e) {
		var control = $(this).parent().attr('id');
		console.log('hide', control);
		hide(control);
	});
	$('#hide').click(function (e) {
		console.log('hide');
		hide(null);
	});
	$('#show').click(function (e) {
		$('.control').each(function () {
			var control = $(this).attr('id');
			var title = $(this).find('input').val();
			var text = $(this).find('textarea').val();
			if (title === '' && text === '') {
				console.log('hide', control);
				hide(control);
			} else {
				console.log('show', control, title, text);
				show(control, title, text, null);
			}
		});
	});
	$('#clear').click(function (e) {
		$('input').val('');
		$('textarea').val('');
	});
	$('#hidelogo').click(function (e) {
		hide('logo');
	});
	$('#showlogo').click(function (e) {
		show('logo', null, null, null);
	});
});
