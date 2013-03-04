var inputString = "学生1楼 学生2楼 教工1楼 教工2楼 缘味轩 麻辣烫 炒饭 煲汤 华莱士 不吃啦！";
var keywords, count;
var result = "";
var times = 0;
var intervalId = -1;
var mainDiv = "";
var menuDiv, resultDiv, mainMsg, luckyBtn, menuIpt, returnBtn, showRst;

function rgba(r, g, b, a) {
	return ("rgba(" + r + "," + g + "," + b + "," + a + ")");
}

function DOMInit () {
	mainDiv = document.getElementById("control");
	menuDiv = document.getElementById("menu");
	resultDiv = document.getElementById("result");
	mainMsg = document.getElementById("message");
	luckyBtn = document.getElementById("luckyButton");
	menuIpt = document.getElementById('menuInput');
	returnBtn = document.getElementById("returnMenu");
	showRst = document.getElementById('resultText');
}

function init () {
	if(mainDiv == "") {
		DOMInit();
	}
	menuDiv.style.display = "none";
	resultDiv.style.display = "none";
	mainDiv.style.display = "";
	if(result == "") {
		mainMsg.innerText = "事，你做！选择，看我的！";
	}
	else {
		mainMsg.innerText = "选择结果：" + result;
		luckyBtn.innerText = "再来一发";
	}
	times = 0;
	adjustSize();
}


function modifyMenu () {
	menuDiv.style.display = "none";
	mainDiv.style.display = "";
	inputString = menuIpt.value;
	luckyBtn.innerText = "试下手气";
}

function cancelMenu() {
	menuDiv.style.display = "none";
	mainDiv.style.display = "";
}

function clearMenu() {
	menuIpt.value = "";
}

function openMenu () {
	menuDiv.style.display = "";
	mainDiv.style.display = "none";
	menuIpt.value = inputString;
}

function okFine () {
	clearInterval(intervalId);
	if (returnBtn.innerText == "等不及啦！") {
		result = keywords[Math.floor(Math.random() * count)];
	}
	init();
}

function ignoreSpace(string) {
	var temp = string.replace('\n', ' ');
	while(temp != string) {
		string = temp;
		temp = temp.replace('\n', ' ');
	}
	temp = temp.split(' ');
	var len = temp.length;
	var returnString = "";
	for (var i = 0; i < len; ++i) {
		returnString += temp[i];
		if(temp[i+1] == "" || temp[i+1] == undefined)
			++i;
		else
			returnString += " ";
	}
	return returnString;
}

function getRandomSelection () {
	times = 0;
	keywords = ignoreSpace(inputString).split(" ");
	count = keywords.length;
	for (var i = 0; i < count; ++i) {
		if(keywords[i].length > 7) {
			keywords[i] = keywords[i].substr(0, 7);
		}
	}
	clearInterval(intervalId);
	mainDiv.style.display = "none";
	resultDiv.style.display = "";
	intervalId = setInterval(antimate, 100);
	returnBtn.innerText = "等不及啦！";
}


// rgba(12, 34, 99, 0.15)
// rgb(115, 179, 72);



function antimate () {
	if(times++ > count + 10) {
		clearInterval(intervalId);
		result = keywords[Math.floor(Math.random() * count)];
		returnBtn.innerText = "就这样吧！";
	}
	else {
		result = keywords[times % count];
	}
	showRst.innerText = result;
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