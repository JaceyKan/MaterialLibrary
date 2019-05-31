// 网页加载完毕
$(function () {
	// 为'#cityName'注册键盘按下事件
	$('#cityName').keydown(function (e) {
		// 当按下回车键时查询天气
		if (e.keyCode == 13) {
			var cityName = $('#cityName').val();
			getWeatherInfo(cityName);
		}
	});

	// 页面加载完成获取默认城市的天气信息
	getWeatherInfo();
});

// 定义获取天气信息的方法，参数：城市名称
function getWeatherInfo(cityName){
	cityName = cityName ? cityName : '北京';
	// 发送请求，跨域获取天气信息
	var d = $.ajax({
		url: 'https://api.jisuapi.com/weather/query',
		// url: 'test.json',  // 离线测试数据
		type: 'get',
		dataType: 'jsonp', // 跨域获取数据
		jsonp: 'callback',
		jsonpCallback: 'abc',
		data: {
			appkey: 'd940c285039469e4',
			city: cityName,
		},
		success: function (data) {
			if (data.msg == 'ok') {
				// 获取到天气信息
				var tag = template('weather', data.result);
				$('#weatherInfo').html(tag);
			} else {
				// 获取不到查询城市的天气信息
				$('#weatherInfo').html('<div class="box">查询不到“'+cityName+'”的天气信息</box>');
			}
		},
		error: function (e) {
			console.log('服务器出现错误，请联系管理员！');
		}
	});

	// 当网络没有连接，或从数据服务器获取数据失败，提示用户
	setTimeout(function() {
		if (d.readyState < 4) {
			$('#weatherInfo').html('<div class="box">获取不到数据, 请检查你的网络,或联系数据提供商</div>');
		}
	}, 500);
}