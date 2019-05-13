// 主入口程序
(function () {
	var map = document.getElementById('view');
	var game = new Game(map);
	game.start();
})()