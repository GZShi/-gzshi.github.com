var inputString = "学生1楼 学生2楼 教工1楼 教工2楼 缘味轩 麻辣烫 炒饭 煲汤 华莱士 不吃啦！";
var keywords, count;
var result = "";
var times = 0;
var intervalId = -1;
var mainDiv = "";
var menuDiv, resultDiv, mainMsg, luckyBtn, menuIpt, returnBtn, showRst, qqwbBtn, weiboBtn, comment, controlDiv;
var initShare = false;
var initDisqus = false;
var displayShare = false;
var displayDisqus = false;

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
	weiboBtn = document.getElementById('shareButton');
	qqwbBtn = document.getElementById('qqwbShare');
	comment = document.getElementById('disqus_thread');
	controlDiv = document.getElementById('controlBoard');
	wbCtrlBtn = document.getElementById('wbControlButton');
	disqusCtrlBtn = document.getElementById('disqusControlButton');
}

function appendScript(source) {
	(function() {
        var js = document.createElement('script');
        js.type = 'text/javascript';
        js.async = true;
        js.src = source;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(js);
    })();
}

function disqusInit() {
	if(initDisqus == false) {
		initDisqus = true;
		// 初始化Disqus
		appendScript('http://lovep.disqus.com/embed.js'); 
/*		(function() {
	        var dsq = document.createElement('script');
	        dsq.type = 'text/javascript';
	        dsq.async = true;
	        dsq.src = 'http://lovep.disqus.com/embed.js';
	        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	    })();*/
	}
	if(displayDisqus == false) {
		displayDisqus = true;
		comment.style.display = "";
		disqusCtrlBtn.innerText = "隐藏评论";
	}
	else {
		displayDisqus = false;
		comment.style.display = "none";
		disqusCtrlBtn.innerText = "打开评论";
	}
}

function shareInit () {
	if(initShare == false) {
		initShare = true;
		// 新浪微博初始化
		appendScript('http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=2537570709');
		// 腾讯微博初始化
		appendScript("http://mat1.gtimg.com/app/openjs/openjs.js#autoboot=no&debug=no");
	}
	if(displayShare == false) {
		displayShare = true;
		wbCtrlBtn.innerText = "隐藏分享按钮";
		qqwbBtn.style.display = "";
		weiboBtn.style.display = "";
	}
	else {
		displayShare = false;
		wbCtrlBtn.innerText = "显示分享按钮";
		qqwbBtn.style.display = "none";
		weiboBtn.style.display = "none";
	}
	adjustSize();
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
		controlDiv.style.left = weiboBtn.style.left = comment.style.left = mainDiv.style.left = menuDiv.style.left = resultDiv.style.left = "0px";
		qqwbBtn.style.left = "80px";
		controlDiv.style.width = comment.style.width = mainDiv.style.width = menuDiv.style.width = resultDiv.style.width = bodyWidth - 3 + "px";
	}
	else {
		controlDiv.style.left = weiboBtn.style.left = mainDiv.style.left = menuDiv.style.left = resultDiv.style.left = (bodyWidth - 400) / 2 + "px";
		qqwbBtn.style.left = (bodyWidth - 400) / 2 + 80 + "px";
		controlDiv.style.width = mainDiv.style.width = menuDiv.style.width = resultDiv.style.width = "400px";
		comment.style.width = 400 + (bodyWidth - 400)/3 + "px";
		comment.style.left = Math.floor((bodyWidth - 400 - (bodyWidth - 400)/3)/2) + "px";
	}
	mainDiv.style.height = menuDiv.style.height = resultDiv.style.height = "250px";
	controlDiv.style.top = "270px";
	weiboBtn.style.top = "330px";
	qqwbBtn.style.top = "330px";
	comment.style.top = "380px";
}
//adjustSize();
window.onresize = adjustSize;
