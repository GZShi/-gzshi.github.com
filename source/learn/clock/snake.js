function clock() {
	var canvas = document.getElementById('main_canvas');
	var ctx = canvas.getContext('2d');
	var width = canvas.getBoundingClientRect().width;
	var height = canvas.getBoundingClientRect().height;
	var centerX = width/2;
	var centerY = height/2;
	var radius = (centerX < centerY ? 0.85 * centerX : 0.85 * centerY);

	function ClockCircle(radius, color, lineWidth) {
		ctx.strokeStyle = "rgba(0,0,0,0.4)";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.stroke();
		ctx.strokeStyle = "white";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius + lineWidth, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.stroke();
	}

	function ClockMark(precision, length, color, lineWidth) {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		for (var i = 0; i < precision; ++i) {
			ctx.beginPath();
				ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, 2 * i * Math.PI / precision, 2 * i * Math.PI / precision, false);
			ctx.closePath();
			ctx.stroke();
		}
		ctx.strokeStyle = "white";
		ctx.lineWidth = lineWidth+2;
		for (var i = 0; i < precision; ++i) {
			ctx.beginPath();
				ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius - length, 2 * i * Math.PI / precision, 2 * i * Math.PI / precision, false);
			ctx.closePath();
			ctx.stroke();
		}
	}

	function ClockClick(angle, length, color, lineWidth) {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, length, angle, angle, false);
		ctx.arc(centerX, centerY, length*0.1, angle + Math.PI, angle + Math.PI, false);
		ctx.closePath();
		ctx.stroke();
	}

	function drawClock() {
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();
		var millisec = now.getMilliseconds();

		var secondsAngle = (-90 + (seconds + (millisec > 80 ? 0 : millisec)/1000) * 6) * Math.PI / 180;
		var minutesAngle = (-90 + (minutes + seconds/60) * 6) * Math.PI / 180;
		var hoursAngle = (-90 + hours * 30 + (minutes*60 + seconds) / 120) * Math.PI / 180;

		ctx.clearRect(0, 0, width, height);

		// 表环
		ClockCircle(radius, "rgba(199, 43, 22, 0.6)", 2);
		// 整分刻度
		ClockMark(60, 7, "rgba(99, 23, 11, 0.7)", 2);
		// 整时刻度
		ClockMark(12, 13, "rgba(99, 23, 11, 0.9)", 3);
		// 时针
		ClockClick(hoursAngle, radius * 0.58, "rgba(199, 43, 22, 0.6)", 4);
		// 分针
		ClockClick(minutesAngle, radius * 0.73, "rgba(199, 43, 22, 0.6)", 3);
		// 秒针
		ClockClick(secondsAngle, radius * 0.86, "rgba(199, 43, 22, 0.6)", 2);

		// 中心小环
		ctx.fillStyle = "rgba(199, 43, 22, 0.8)";
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, 5, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
	}
	setInterval(drawClock, 50);
}
