(function () {
	// 游戏的逻辑
	function Game(map) {
		this.map = map;
		this.snake = new Snake();
		this.food = new Food();
	}

	Game.prototype.start = function () {
		this.food.render(this.map);
		this.snake.render(this.map);

		// 让蛇跑起来
		this.runningSnake(this.snake, this.map, this.food);
		// 按下键盘方向键，设置蛇的移动方向
		this.setSnakeDirection(this.snake);
	}

	// 按下键盘方向键，设置蛇的移动方向
	Game.prototype.setSnakeDirection = function (snake) {
		document.onkeydown = function (e){
			// console.log(e.keyCode);
			// 37: left
			// 38: up
			// 39: right
			// 40: down
			switch (e.keyCode) {
				case 37:
					snake.direction = 'left';
					break;
				case 38:
					snake.direction = 'up';
					break;
				case 39:
					snake.direction = 'right';
					break;
				case 40:
					snake.direction = 'down';
					break;
			}
		}
	}

	// 让蛇跑起来
	Game.prototype.runningSnake = function (snake, map, food) {
		var snakeRunTimeId = setInterval(function () {
			// 记录最后一节蛇身的位置后移动蛇
			// var lastBodyX = snake.body[snake.body.length - 1].x;
			// var lastBodyY = snake.body[snake.body.length - 1].y;
			snake.move(food);
			snake.render(map);

			// 当蛇头移动到游戏区边界时，游戏结束
			var head = snake.body[0];
			var x = head.x * snake.w;
			var y = head.y * snake.h;
			var maxX = map.offsetWidth;
			var maxY = map.offsetHeight;
			if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
				// 游戏结束,清除定时器
				alert("Game Over!");
				clearInterval(snakeRunTimeId);
			}

			// // 当蛇头的位置与食物的位置一致时，
			// if (x === food.x && y === food.y) {
			// 	// 吃掉食物，食物消失，再重新生成一个食物
			// 	food.render(map);

			// 	// 蛇身增加一节
			// 	bodyLength = snake.body.length;
			// 	snake.body[bodyLength] = {
			// 		x: lastBodyX,
			// 		y: lastBodyY,
			// 		color: 'blue'
			// 	};
			// }
			
		}, 150);	
	}

	window.Game = Game;
})();

