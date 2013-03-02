var inputString = "学生1楼 学生2楼 教工1楼 教工2楼 缘味轩 麻辣烫 炒饭 煲汤 华莱士 不吃啦！";
var result = "";
var red = 14;
var green = 13;
var blue = 4;
var alpha = 0.58;
var times = 0;
var intervalId = -1;
var mainDiv;
var menuDiv;
var resultDiv;

function rgba(r, g, b, a) {
	return ("rgba(" + r + "," + g + "," + b + "," + a + ")");
}

function init () {
	mainDiv = document.getElementById("control");
	menuDiv = document.getElementById("menu");
	resultDiv = document.getElementById("result");
	menuDiv.style.display = "none";
	resultDiv.style.display = "none";
	mainDiv.style.display = "";
	mainDiv.style.background = rgba(red, green, blue, alpha);
	red = 14;
	green = 13;
	blue = 4;
	alpha = 0.58;
	times = 0;
	adjustSize();
}


function modifyMenu () {
	menuDiv.style.display = "none";
	mainDiv.style.display = "";
	inputString = document.getElementById('menuInput').value;
}

function cancelMenu() {
	menuDiv.style.display = "none";
	mainDiv.style.display = "";
}

function openMenu () {
	menuDiv.style.display = "";
	mainDiv.style.display = "none";
	document.getElementById('menuInput').value = inputString;
}

function getRandomSelection () {
	times = 0;
	clearInterval(intervalId);
	mainDiv.style.display = "none";
	resultDiv.style.display = "";
	intervalId = setInterval(antimate, 100);
}


// rgba(12, 34, 99, 0.15)
// rgb(115, 179, 72);

function antimate () {
	var keywords = inputString.split(" ");
	var count = keywords.length;
	if(times++ > count + 10) {
		clearInterval(intervalId);
		result = keywords[Math.floor(Math.random() * count)];
	}
	else {
		result = keywords[times % count];
	}
	document.getElementById('resultText').innerText = result;
}

// Adjust window size

function adjustSize() {
	var bodyWidth = document.body.clientWidth;
	var bodyHeight = document.body.clientHeight;
	if(bodyWidth < 420) {
		mainDiv.style.left = menuDiv.style.left = resultDiv.style.left = "0px";
	}
	else {
		mainDiv.style.left = menuDiv.style.left = resultDiv.style.left = (bodyWidth - 400) / 2 + "px";
	}
	if(bodyHeight < 260) {
		mainDiv.style.top = menuDiv.style.top = resultDiv.style.top = "5px";
	}
	else {
		mainDiv.style.top = menuDiv.style.top = resultDiv.style.top = (bodyHeight - 250) / 2 + "px";
	}
}
//adjustSize();
window.onresize = adjustSize;