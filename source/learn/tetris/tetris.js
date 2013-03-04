// 全局变量
var canvas = document.getElementById("mainCanvas");
var nextCanvas = document.getElementById("nextCanvas");
var ctx = canvas.getContext('2d');

var mainWindowHeight = 20;
var mainCanvasInteralId = -1;

var score = 0;
var gap = 30;
var theNextBlock = getRandomBlock();

var theBlock = theNextBlock;
theNextBlock = getRandomBlock();
var theBase = new base();
theBase.init();

var keyDownCount = 0;
var lastSpeedUpTime = 0;
var lastKeyDownEvent = 'press';

var pauseFlag = false;
var normal = 600;
var fast = 200;
var veryFast = 20;


var shapeDefine = [[], [], [], [], [], [], []];
// I 型
shapeDefine[0][0] = [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}];		// 横
shapeDefine[0][1] = [{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:0, y:3}];		// 竖
// L 型
shapeDefine[1][0] = [{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:1, y:2}];
shapeDefine[1][1] = [{x:0, y:1}, {x:1, y:1}, {x:2, y:1}, {x:2, y:0}];
shapeDefine[1][2] = [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:1, y:2}];
shapeDefine[1][3] = [{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:2, y:0}];
// J 型
shapeDefine[2][0] = [{x:1, y:0}, {x:1, y:1}, {x:1, y:2}, {x:0, y:2}];
shapeDefine[2][1] = [{x:0, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}];
shapeDefine[2][2] = [{x:0, y:0}, {x:1, y:0}, {x:0, y:1}, {x:0, y:2}];
shapeDefine[2][3] = [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:2, y:1}];
// O 型
shapeDefine[3][0] = [{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:1, y:1}];
// S 型
shapeDefine[4][0] = [{x:0, y:0}, {x:0, y:1}, {x:1, y:1}, {x:1, y:2}];
shapeDefine[4][1] = [{x:1, y:0}, {x:2, y:0}, {x:1, y:1}, {x:0, y:1}];
// Z 型
shapeDefine[5][0] = [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:1}];
shapeDefine[5][1] = [{x:1, y:0}, {x:1, y:1}, {x:0, y:1}, {x:0, y:2}];
// T 型
shapeDefine[6][0] = [{x:1, y:1}, {x:0, y:1}, {x:2, y:1}, {x:1, y:2}];
shapeDefine[6][1] = [{x:0, y:1}, {x:0, y:0}, {x:1, y:1}, {x:0, y:2}];
shapeDefine[6][2] = [{x:1, y:1}, {x:0, y:1}, {x:2, y:1}, {x:1, y:0}];
shapeDefine[6][3] = [{x:1, y:1}, {x:0, y:1}, {x:1, y:0}, {x:1, y:2}];

var shapeBound = [[], [], [], [], [], [], []];
// I
shapeBound[0][0] = {lx:0, rx:4};
shapeBound[0][1] = {lx:0, rx:1};
// L
shapeBound[1][0] = {lx:0, rx:2};
shapeBound[1][1] = {lx:0, rx:3};
shapeBound[1][2] = {lx:0, rx:2};
shapeBound[1][3] = {lx:0, rx:3};
// J
shapeBound[2][0] = {lx:0, rx:2};
shapeBound[2][1] = {lx:0, rx:3};
shapeBound[2][2] = {lx:0, rx:2};
shapeBound[2][3] = {lx:0, rx:3};
// O
shapeBound[3][0] = {lx:0, rx:2};
// S
shapeBound[4][0] = {lx:0, rx:2};
shapeBound[4][1] = {lx:0, rx:3};
// Z
shapeBound[5][0] = {lx:0, rx:3};
shapeBound[5][1] = {lx:0, rx:2};
// T
shapeBound[6][0] = {lx:0, rx:3};
shapeBound[6][1] = {lx:0, rx:2};
shapeBound[6][2] = {lx:0, rx:3};
shapeBound[6][3] = {lx:0, rx:2};

var suitablePos = [[], [], [], [], [], [], []];
// I
suitablePos[0][0] = {x:0, y: 1.5};
suitablePos[0][1] = {x:1.5, y: 0};
// L
suitablePos[1][0] = {x:1, y: 0.5};
suitablePos[1][1] = {x:0.5, y: 1};
suitablePos[1][2] = {x:1, y: 0.5};
suitablePos[1][3] = {x:0.5, y: 1};
// J
suitablePos[2][0] = {x:1, y: 0.5};
suitablePos[2][1] = {x:0.5, y: 1};
suitablePos[2][2] = {x:1, y: 0.5};
suitablePos[2][3] = {x:0.5, y: 1};
// O
suitablePos[3][0] = {x:1, y: 1};
// S
suitablePos[4][0] = {x:1, y: 0.5};
suitablePos[4][1] = {x:0.5, y: 1};
// Z
suitablePos[5][0] = {x:0.5, y: 1};
suitablePos[5][1] = {x:1, y: 0.5};
// T
suitablePos[6][0] = {x:0.5, y: 0};
suitablePos[6][1] = {x:1, y: 0.5};
suitablePos[6][2] = {x:0.5, y: 1};
suitablePos[6][3] = {x:1, y: 0.5};


ctx.fillStyle = "rgba(29, 99, 188, 0.6)";


function rgba(r, g, b, a) {
	return ("rgba(" + r + "," + g + "," + b + "," + (a==null ? 1 : a) + ")");
}

function base() {
	var container = [];

	this.init = function () {
		for (var i = 0; i < 21; ++i) {
			var row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			container.push(row);
		}
		for (var i = 0; i < 10; ++i) {
			container[20][i] = -1;
		}
	}

	this.mergeBlock = function (blockInfo) {
		var x, y;
		for (var i = 0; i < 4; ++i) {
			x = blockInfo.x + shapeDefine[blockInfo.type][blockInfo.status][i].x;
			y = blockInfo.y + shapeDefine[blockInfo.type][blockInfo.status][i].y;
			container[y][x] = 1;
		}
	} 

	this.checkCollision = function(blockInfo, nextDirection) {
		var x, y;
		var statusAmount = [2, 4, 4, 1, 2, 2, 4, 4];
		var type = blockInfo.type;
		var status = blockInfo.status;
		if (nextDirection.x == nextDirection.y) {
			status = (status + 1) % statusAmount[type];
		}
		for (var i = 0; i < 4; ++i) {
			x = blockInfo.x + shapeDefine[type][status][i].x + nextDirection.x;
			y = blockInfo.y + shapeDefine[type][status][i].y + nextDirection.y;
			if (container[y][x] != 0 && container[y][x] != undefined)
				return true;
		}
		return false;
	}

	this.checkIntectLine = function() {
		for(var i = 19; i >= 0; --i) {
			var flag = 1;
			var sum = 0;
			for (var j = 0; j < 10; ++j) {
				flag *= container[i][j];
				sum += container[i][j];
			}
			if(sum == 0)
				return false;
			if(flag != 0) {
				return true;
			}
		}
		return false;
	}

	this.simplify = function () {
		var totalLine = 0;
		for(var i = 19; i >= 0; --i) {
			var flag = 1;
			var sum = 0;
			for (var j = 0; j < 10; ++j) {
				flag *= container[i][j];
				sum += container[i][j];
			}
			if(sum == 0)
				return totalLine;
			if(flag != 0) {
				for (var k = i; k > 0; --k) {
					container[k] = container[k-1];
				}
				container[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				++i;
				totalLine += 1;
			}
		}
		return totalLine;
	}

	this.draw = function () {
		for (var i = 19; i >= 0; --i) {
			var sum = 0;
			for (var j = 0; j < 10; ++j) {
				sum += container[i][j];
				if(container[i][j] != 0) {
					ctx.fillRect(j * gap, i * gap, gap - 1, gap - 1);
				}
			}
		}
	}
}

function block(initType, initStatus) {	
	var pos = {x:0, y:0};
	var type = initType;
	var status = initStatus;
	var statusAmount = [2, 4, 4, 1, 2, 2, 4, 4];

	this.clear = function () {
		for (var i = 0; i < 4; ++i) {
			ctx.clearRect(
				(pos.x + shapeDefine[type][status][i].x)*gap, 
				(pos.y + shapeDefine[type][status][i].y)*gap, 
				gap-1, gap-1);
		}
	}

	this.draw = function () {
		for (var i = 0; i < 4; ++i) {
			ctx.fillRect(
				(pos.x + shapeDefine[type][status][i].x)*gap, 
				(pos.y + shapeDefine[type][status][i].y)*gap, 
				gap-1, gap-1);
		}
	}

	this.nextDraw = function () {
		var tempGap = gap/2 - 1;
		for (var i = 0; i < 4; ++i) {
			ctx.fillRect(
				(pos.x + shapeDefine[type][status][i].x)*gap, 
				(pos.y + shapeDefine[type][status][i].y)*gap, 
				tempGap, tempGap);
			ctx.fillRect(
				(pos.x + shapeDefine[type][status][i].x)*gap + tempGap +1, 
				(pos.y + shapeDefine[type][status][i].y)*gap, 
				tempGap, tempGap);
			ctx.fillRect(
				(pos.x + shapeDefine[type][status][i].x)*gap, 
				(pos.y + shapeDefine[type][status][i].y)*gap + tempGap +1, 
				tempGap, tempGap);
			ctx.fillRect(
				(pos.x + shapeDefine[type][status][i].x)*gap + tempGap +1, 
				(pos.y + shapeDefine[type][status][i].y)*gap + tempGap +1, 
				tempGap, tempGap);
		}
	}

	this.drop = function () {
		this.clear();
		pos.y += 1;
		this.draw();
	}

	this.moveLeft = function () {
		if (pos.x + shapeBound[type][status].lx <= 0)
			return ;
		else {
			this.clear();
			pos.x -= 1;
			this.draw();
		}
	}
	this.moveRight = function () {
		if (pos.x + shapeBound[type][status].rx >= 10)
			return ;
		else {
			this.clear();
			pos.x += 1;
			this.draw();
		}
	}

	this.rotate = function () {
		var nextStatus = (status + 1) % statusAmount[type];
		var newX = pos.x;

		while (newX + shapeBound[type][nextStatus].lx < 0) {
			newX += 1;
		}
		while (newX + shapeBound[type][nextStatus].rx > 10) {
			newX -= 1;
		}

		this.clear();
		pos.x = newX;
		status = nextStatus;
		this.draw();
	}

	this.getInfo = function () {
		return ({
			x: pos.x,
			y: pos.y < 0 ? 0 : pos.y,
			type: type,
			status: status
		});
	}

	this.setStartPos = function() {
		pos.x = 4;
		pos.y = -1;
	}

	this.setSuitablePos = function () {
		pos.x = suitablePos[type][status].x;
		pos.y = suitablePos[type][status].y;
	}
}

function getRandomBlock() {
	var typeStatus = [2, 4, 4, 1, 2, 2, 4, 4];
	var tempType = Math.floor(Math.random()*7);
	var tempStatus = Math.floor(Math.random() * typeStatus[tempType]);
	return (new block(tempType, tempStatus));
}



function drawBoundAndNetLine() {
	var smallStack = ctx.fillStyle;

	// 网格线
	ctx.fillStyle = rgba(0, 0, 0, 0.13);
	for (var i = 0; i < 10; ++i) {
		ctx.fillRect(i * gap - 1, 0, 1, 20 * gap);
	}
	for (var i = 0; i < 20; ++i) {
		ctx.fillRect(0, i * gap - 1, 10 * gap , 1);
	}

	ctx.fillStyle = smallStack;
}

///////////////////////////////////////////////////////////////
function drawFrame() {
	//ctx.clearRect(0, 0, 500, 600);
	// 检测与基底接触
	if (true == theBase.checkCollision(theBlock.getInfo(), {x:0, y:1})) {
		theBase.mergeBlock(theBlock.getInfo());

		clearInterval(mainCanvasInteralId);
		mainCanvasInteralId = setInterval(drawFrame, 600);
		// 检测完整的一行
		if ( true == theBase.checkIntectLine()) {
			//clearInterval(mainCanvasInteralId);
			//setInterval(drawClearLine, 200);
			ctx.clearRect(0, 0, 300, 600);
			drawBoundAndNetLine();

			setScore(theBase.simplify());
			theBase.draw();
		}
		theBlock = theNextBlock;
		theBlock.setStartPos();
		theNextBlock = getRandomBlock();
		drawNextBlock();
		return ;
	}
	theBlock.clear();
	theBlock.drop();
	theBlock.draw();
}

function setHighSpeed() {
	var refreshTime = 300;
	if(mainCanvasInteralId == -1 || keyDownCount++ > 0)
		return ;
	else {
		var nowTime = (new Date()).getTime();
		if((nowTime - lastSpeedUpTime < 500) && (lastKeyDownEvent != 'doublepress')) {
			refreshTime = 10;
			lastKeyDownEvent = 'doublepress';
			keyDownCount = 0;
		}
		else {
			lastKeyDownEvent = 'press';
		}
		lastSpeedUpTime = nowTime;
		//alert("speed up");
		clearInterval(mainCanvasInteralId);
		mainCanvasInteralId = setInterval(drawFrame, refreshTime);
	}
}

function setNormalSpeed(event) {
	if(event.keyCode != 40 || mainCanvasInteralId == -1 || lastKeyDownEvent == 'doublepress') 
		return ;
	else {
		//alert("speed down");
		clearInterval(mainCanvasInteralId);
		drawFrame();
		mainCanvasInteralId = setInterval(drawFrame, 600);
		keyDownCount = 0;
	}
}

function setScore(totalLine) {
	var scoreMap = [0, 100, 250, 400, 600];
	var scoreBoard = document.getElementById("scoreBoard");
	score += scoreMap[totalLine];
	scoreBoard.innerText = score;
}

function drawNextBlock() {
	theNextBlock.setSuitablePos();
	var oldCtx = ctx;
	ctx = nextCanvas.getContext("2d");
	ctx.clearRect(0, 0, 120, 120);
	ctx.fillStyle = "white";
	theNextBlock.nextDraw();
	ctx = oldCtx;
}

function convertKeyValue(event) {
	//alert(event.keyCode);
	if (pauseFlag == true && event.keyCode != 80)
		return ;
	switch(event.keyCode) {
	case 37: // left
		if (false == theBase.checkCollision(theBlock.getInfo(), {x:-1, y:0}))
			theBlock.moveLeft();
		break;
	case 39: // right
		if (false == theBase.checkCollision(theBlock.getInfo(), {x:1, y:0}))
			theBlock.moveRight();
		break;
	case 38: // up
		if (false == theBase.checkCollision(theBlock.getInfo(), {x:0, y:0}))
			theBlock.rotate();
		break;
	case 40: // down
		setHighSpeed();
		break;
	case 80: // press 'p'
		if (pauseFlag == true) {
			startGame();
		}
		else {
			pauseGame();
		}
	default: break;
	}
}

function closeWindow() {
	var win = document.getElementById('cover');
	win.style.display = "none";
}

function openWindow() {
	var win = document.getElementById('cover');
	win.style.display = "";
}

function pauseGame() {
	document.getElementById("start").style.display = "";
	document.getElementById("pause").style.display = "none";
	pauseFlag = true;
	clearInterval(mainCanvasInteralId);
	mainCanvasInteralId = -1;
}

function startGame() {
	document.getElementById("start").style.display = "none";
	document.getElementById("pause").style.display = "";
	pauseFlag = false;
	mainCanvasInteralId = setInterval(drawFrame, normal);
}

function drawIcons() {
	var pauseCtx = document.getElementById('pauseCanvas').getContext('2d');
	var startCtx = document.getElementById('startCanvas').getContext('2d');

	pauseCtx.fillStyle = "white";
	pauseCtx.fillRect(35, 0, 9, 50);
	pauseCtx.fillRect(45, 0, 9, 50);
	pauseCtx.fillRect(65, 0, 9, 50);
	pauseCtx.fillRect(75, 0, 9, 50);

	startCtx.fillStyle = "white";
	for (var i = 0; i < 5; i++) {
		startCtx.fillRect(35 + i*10, 0 + i*5, 9, 50 - 10*i);
	}
}

closeWindow();
drawBoundAndNetLine();
setFramePosition ();
mainCanvasInteralId = setInterval(drawFrame, 600);
document.onkeydown = convertKeyValue;
document.onkeyup = setNormalSpeed;
window.onresize = setFramePosition;
setScore(0);
drawNextBlock();
theBlock.setStartPos();
document.getElementById("start").style.display = "none";
drawIcons();