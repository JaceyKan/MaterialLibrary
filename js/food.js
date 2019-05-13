// 自调用函数
(function () {
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
})();

// 测试代码
// var map = document.getElementById('view');
// var food = new Food();
// food.render(map);
// food.render(map);
// food.render(map);
