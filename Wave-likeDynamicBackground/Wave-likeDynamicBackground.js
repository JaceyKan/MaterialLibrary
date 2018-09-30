(function(){
	var canvas = document.getElementById("wdbg");
	var ctx = canvas.getContext("2d");
	var waveColors = ["rgba(0,222,255,0.2)",
				 "rgba(157,192,249,0.2)",
				 "rgba(0,168,255,0.2)"];
	var range = canvas.height/8;
	var step = 0;

	//用于支持动画，1秒钟变换60次图像形成动画。
	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame ||
			   window.webkitRequestAnimationFrame ||
			   window.mozRequestAnimationFrame ||
			   function( callback ){
			   	window.setTimeout(callback, 1000/60);
			   };
	})();

	//画波浪
	//color: 波浪的颜色
	//angel: 正弦、余弦函数的角度值，控制左、右上角的高度
	//range: 波浪高度变化范围，控件波浪大小
	function drawWave(color, angle, range){
		ctx.fillStyle = color;  //填充颜色
		
		var radian = angle*Math.PI/180; //角度转换成弧度
		var deltaHeightLeft = Math.sin(radian) * range;  //矩形高度的变化量（左上顶点）
		var deltaHeightRight = Math.cos(radian) * range;//矩形高度的变化量（右上顶点）
		ctx.beginPath();  //开始绘制路径
		ctx.moveTo(0, canvas.height/2+deltaHeightLeft); //左上角
		//画曲线
		ctx.bezierCurveTo(canvas.width/2, canvas.height/2+deltaHeightLeft-range, canvas.width/2, canvas.height/2+deltaHeightRight-range, canvas.width, canvas.height/2+deltaHeightRight);
		ctx.lineTo(canvas.width, canvas.height/2+deltaHeightRight);  //右上角
		ctx.lineTo(canvas.width, canvas.height); //右下角
		ctx.lineTo(0, canvas.height); //左下角
		ctx.lineTo(0, canvas.height/2+deltaHeightLeft);
		ctx.closePath();  //闭合路径
		ctx.fill();  //填充路径
	}
	//drawWave("rgba(0,222,255,0.2)", 90, canvas.height/8);

	function loop(){
		step++;
		ctx.clearRect(0,0,canvas.width,canvas.height);  //清空canvas

		//画多个波浪
		for(var i=0; i<waveColors.length; i++){
			angle = step + i*45;
			var color = waveColors[i];
			drawWave(color, angle, range);
			
		}
		requestAnimFrame(loop); //回调loop函数
	}

	loop();
})();
