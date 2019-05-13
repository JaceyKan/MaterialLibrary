// ---------------tools------------------
;(function () {
	var Tools = {
		getRandom: function (min, max) {
			// 随机生成min~max之间的随机整数，包含min、max
			return parseInt(Math.random() * (max - min + 1) + min);
		},
	}

	window.Tools = Tools;
})()

// ---------------food------------------
;(function () {
	var position = 'absolute';
	var foodElements = [];	// 用于存储所有食物元素
	// 食物构造函数
	function Food(options) {
		options = options || {};
		this.w = options.w || 20;
		this.h = options.h || 20;
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.background = options.background || 'green';
	}
	// 随机生成食物的位置
	Food.prototype.randomPosition = function (map) {
		this.x = Tools.getRandom(0, map.offsetWidth / this.w - 1) * this.w;
		this.y = Tools.getRandom(0, map.offsetHeight / this.h - 1) * this.h;
	}

	// 在页面上渲染食物对象
	Food.prototype.render = function (map) {
		// 渲染食物前先删除所有食物
		removeFood();

		var div = document.createElement('div');
		map.appendChild(div);
		div.style.width = this.w + 'px';
		div.style.height = this.h + 'px';
		div.style.position = position;
		div.style.background = this.background;

		this.randomPosition(map);
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';

		foodElements.push(div);
	}

	// 删除食物
	function removeFood () {
		for (var i = foodElements.length - 1; i >= 0; i--) {
			// 删除dom中的当前对象
			var food = foodElements[i];
			food.parentNode.removeChild(food);
			// 删除数组中的当前对象
			foodElements.splice(i, 1);
		}
	}

	// 把Food构造函数暴露给外部
	window.Food = Food;
})()

// --------------------snake------------------------
;(function () {
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
	Snake.prototype.move = function (food, map) {
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

		// 当蛇头的位置与食物的位置一致时
		var head = this.body[0];
		var headX = head.x * this.w;
		var headY = head.y * this.h;
		if (headX === food.x && headY === food.y) {
			// 吃掉食物，食物消失，再重新生成一个食物
			food.render(map);

			// 蛇身增加一节
			var length = this.body.length;
			var last = this.body[length - 1]
			this.body[length] = {
				x: last.x,
				y: last.y,
				color: last.color
			};
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
})()

// --------------------game------------------------
;(function () {
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
			snake.move(food, map);
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
			
		}, 150);	
	}

	window.Game = Game;
})()

// --------------------调用------------------------
;(function () {
	var map = document.getElementById('view');
	var game = new Game(map);
	game.start();
})()