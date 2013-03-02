var inputString = "学生1楼 学生2楼 教工1楼 教工2楼 缘味轩 麻辣烫 炒饭 煲汤 华莱士 不吃啦！";
var result = "";
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
	mainDiv.style.background = rgba(14, 13, 4, 0.58);
	if(result == "") {
		document.getElementById("message").innerText = "事，你做！选择，看我的！";
	}
	else {
		document.getElementById("message").innerText = "选择结果：" + result;
	}
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

function okFine () {
	clearInterval(intervalId);
	init();
}

function getRandomSelection () {
	times = 0;
	clearInterval(intervalId);
	mainDiv.style.display = "none";
	resultDiv.style.display = "";
	intervalId = setInterval(antimate, 100);
	document.getElementById("returnMenu").innerText = "等不及啦！";
}


// rgba(12, 34, 99, 0.15)
// rgb(115, 179, 72);

function antimate () {
	var keywords = inputString.split(" ");
	var count = keywords.length;
	if(times++ > count + 10) {
		clearInterval(intervalId);
		result = keywords[Math.floor(Math.random() * count)];
		document.getElementById("returnMenu").innerText = "就这样吧！";
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
		mainDiv.style.width = menuDiv.style.width = resultDiv.style.width = bodyWidth - 3 + "px";
	}
	else {
		mainDiv.style.left = menuDiv.style.left = resultDiv.style.left = (bodyWidth - 400) / 2 + "px";
		mainDiv.style.width = menuDiv.style.width = resultDiv.style.width = "400px";
	}
	if(bodyHeight < 260) {
		mainDiv.style.top = menuDiv.style.top = resultDiv.style.top = "5px";
	}
	else {
		mainDiv.style.top = menuDiv.style.top = resultDiv.style.top = (bodyHeight - 250) / 2 + "px";
	}
	mainDiv.style.height = menuDiv.style.height = resultDiv.style.height = "250px";
}
//adjustSize();
window.onresize = adjustSize;