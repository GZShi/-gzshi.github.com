var inputString = "学生1楼 学生2楼 教工1楼 教工2楼 缘味轩 麻辣烫 炒饭 煲汤 华莱士 不吃啦！";
var keywords, count;
var result = "";
var times = 0;
var intervalId = -1;
var mainDiv = "";
var menuDiv, resultDiv, mainMsg, luckyBtn, menuIpt, returnBtn, showRst, qqwbBtn, shareBtn, comment;
var initComment = false;

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
	shareBtn = document.getElementById('shareButton');
	qqwbBtn = document.getElementById('qqwb_share__');
	comment = document.getElementById('disqus_thread');
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
	if(initComment == false) {
		// 初始化Disqus
		(function() {
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '/myDisqus.min.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
        // 初始化新浪微博分享

        initComment = true;
	}
}


function modifyMenu () {
	if (ignoreSpace(menuIpt.value) == "") {
		if(menuIpt.value != "") {
			alert("(╯￣Д￣)╯┴—┴\n让我从一大堆空格中做选择我已经无力吐槽啦！");
		}
		else {
			alert("(╯￣Д￣)╯┴—┴\n神马都没有你叫我怎么选！");
		}
		return ;
	}
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
	if(count == 1) {
		alert("~\(≧3≦)/~\n骚年，就一个选项而已，别玩我啦！");
		mainMsg.innerText = "选择结果：" + keywords[0];
		return ;
	}
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
		shareBtn.style.left = comment.style.left = mainDiv.style.left = menuDiv.style.left = resultDiv.style.left = "0px";
		qqwbBtn.style.left = "80px";
		comment.style.width = mainDiv.style.width = menuDiv.style.width = resultDiv.style.width = bodyWidth - 3 + "px";
	}
	else {
		shareBtn.style.left = mainDiv.style.left = menuDiv.style.left = resultDiv.style.left = (bodyWidth - 400) / 2 + "px";
		qqwbBtn.style.left = (bodyWidth - 400) / 2 + 80 + "px";
		mainDiv.style.width = menuDiv.style.width = resultDiv.style.width = "400px";
		comment.style.width = 400 + (bodyWidth - 400)/3 + "px";
		comment.style.left = Math.floor((bodyWidth - 400 - (bodyWidth - 400)/3)/2) + "px";
	}
	mainDiv.style.height = menuDiv.style.height = resultDiv.style.height = "250px";
	shareBtn.style.top = "270px";
	qqwbBtn.style.top = "270px";
	comment.style.top = "320px";
}
//adjustSize();
window.onresize = adjustSize;
