(function () {
	var position = 'absolute';
	var snake;
	var snakeNodes = [];
	function Snake(options) {
		options = options || {};
		this.w = options.w || 20;
		this.h = options.h || 20;
		this.direction = options.direction || 'right';
		this.body = [
			{x: 3, y: 1, color: 'red'},
			{x: 2, y: 1, color: 'blue'},
			{x: 1, y: 1, color: 'blue'}
		];
		snake = this;
	}

	// 渲染蛇
	Snake.prototype.render = function (map) {
		// 先删除已有的蛇
		removeSnake();

		for(var i = 0, len = this.body.length; i < len; i++) {
			var snakeNode = this.body[i];
			var div = document.createElement('div');
			map.appendChild(div);
			div.style.width = this.w + 'px';
			div.style.height = this.h + 'px';
			div.style.position = position;
			div.style.left = snakeNode.x * this.w + 'px';
			div.style.top = snakeNode.y * this.h + 'px';
			div.style.background = snakeNode.color;

			snakeNodes.push(div);
		}
	}

	// 让蛇动一步
	Snake.prototype.move = function () {
		// 蛇的身体移动一步
		// 每个蛇节移动到的位置是上一个蛇节的位置
		for (var i = this.body.length - 1; i > 0; i--) {
			var snakeNode = this.body[i];
			snakeNode.x = this.body[i - 1].x;
			snakeNode.y = this.body[i - 1].y;
		}

		var head = this.body[0];
		// 蛇头移动一步
		// 蛇身先移动完才能移动蛇头
		switch (this.direction) {
			case 'up':
				head.y--;
				break;
			case 'right':
				head.x++;
				break;
			case 'down':
				head.y++;
				break;
			case 'left':
				head.x--;
				break;
		}
	}

	// 删除蛇---snakeNodes
	function removeSnake() {
		for (var i = snakeNodes.length - 1; i >= 0; i--) {
			// 删除dom中的对应元素
			var snakeNode = snakeNodes[i];
			snakeNode.parentNode.removeChild(snakeNode);
			// 删除snakeNodes中的对应元素
			snakeNodes.splice(i, 1);
		}
	}
	
	window.Snake = Snake;
})();

// 测试snake
// var map = document.getElementById('view');
// var snake = new Snake();

// snake.move();
// snake.move();
// snake.move();
// snake.render(map);
// snake.run();