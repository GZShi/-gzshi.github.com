function animate () {
	var gameId = "1";
	this.pauseFlag = false;
	var ballsArray;
	var total;
	var boundary = {left: 0, right: 1000, top:0, bottom: 500};
	var minWidth = 10000;
	var minHeight = 10000;
	var maxTotal = 0;
	var intervalId = -1;
	var ctx;
	var lastColor;
	var begin = -1;
	var clickTimes = -1;
	var gameOver = false;

	function calculateScore (minWidth, minHeight, clickTimes, startTime, pauseTime, endTime, smallTotal) {
		var score = (minWidth*minHeight);
		score = score * score / 10000;
		score = score/(clickTimes*1000+(endTime-startTime-pauseTime)*smallTotal/100);
		score = Math.floor(score);
		return score;
	}

	function frame () {
		total = ballsArray.length;

		if (total <= 0) {
			ctx.fillStyle = lastColor;
			ctx.clearRect(0, 0, boundary.right, boundary.bottom);
			ctx.fillRect(0, 0, boundary.right, boundary.bottom);
			clearInterval(intervalId);
			intervalId = -1;
			if (gameOver == false)
				score = calculateScore(minWidth, minHeight, clickTimes, begin, 0, (new Date()).getTime(), maxTotal);
			displayScore(score);
			gameOver = true;
			return ;
		}
		
		ctx.clearRect(0, 0, boundary.right, boundary.bottom);
		// 绘制一帧
		for (var i = 0; i < total; ++i) {
			ballsArray[i].drawMyself(ctx);
		}

		// 更新数据
		for (var i = 0; i < total; ++i) {
			if (total == 1 && ballsArray[0].type == "big") {
				if (false == ballsArray[0].expand()) {
					--total;
					ballsArray.shift();
					lastColor = ctx.fillStyle;
				}
				message('last');
				break;
			}
			if(false == ballsArray[i].update(boundary)) {
				ballsArray.splice(i, 1);
				--total;
			}
		}

		// 精确碰撞检测，牺牲性能
		if (total < 20) {
			for (var i = 0; i < total; ++i) {
				if (ballsArray[i].type == "big")
					continue;
				for (var j = 0; j < total; ++j) {
					if (i == j)
						continue;
					if(ballsArray[i].checkCollision(ballsArray[j])) {
						i = 0; j = 0;
					}
				}
			}
		} else {
			for (var i = 0; i < total; ++i) {
				if (ballsArray[i].type == "big")
					continue;
				for (var j = 0; j < total; ++j) {
					if (i == j)
						continue;
					ballsArray[i].checkCollision(ballsArray[j]);
				}
			}
		}
	}

	this.play = function () {
		if (intervalId != -1) {
			return ;
		}
		this.pauseFlag = false;
		intervalId = setInterval(frame, 20);
		message("play");
	}

	this.pause = function () {
		this.pauseFlag = true;
		clearInterval(intervalId);
		intervalId = -1;
		message("stop");
	}

	this.init = function (context, balls, left, right, top, bottom) {
		gameId = Math.random();
		ctx = context;
		boundary.left = left;
		boundary.right = right;
		boundary.top = top;
		boundary.bottom = bottom;
		ballsArray = balls;
		total = balls.length;
		if ((boundary.right - boundary.left) * (boundary.bottom - boundary.top) < minHeight*minWidth) {
			minHeight = boundary.bottom - boundary.top;
			minWidth = boundary.right - boundary.left;
		}
		if (ballsArray.length > maxTotal) {
			maxTotal = ballsArray.length;
		}
	}

	this.setBegin = function (n) {
		begin = n;
	}

	this.setClickTimes = function (n) {
		clickTimes = n;
	}
}
