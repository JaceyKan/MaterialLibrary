(function () {
	var Tools = {
		getRandom: function (min, max) {
			// 随机生成min~max之间的随机整数，包含min、max
			return parseInt(Math.random() * (max - min + 1) + min);
		},
	}

	window.Tools = Tools;
})();