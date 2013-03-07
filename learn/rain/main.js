var screenHeight;
var screenWidth;
var divWidth = 10;
var fontHeight = 15;
var rowNumber = 0;
var initFlag = false;

function rgba(r, g, b, a) {
	return ("rgba(" + r + "," + g + "," + b + "," + a + ")");
}

function appendNewNode(cloud) {
	var newDiv = document.createElement('div');
	//newDiv.async = true;
	newDiv.innerText = 'abcdefghijklmnopqrstuvwxyzABCDFGHJKMNQRSTWXZ~!@#$%^&*_'.split('')[Math.floor(Math.random() * 54)];
	newDiv.style.color = rgba(4, 221, 4, Math.random() * 0.5 + 0.2);
	cloud.insertBefore(newDiv, cloud.getElementsByTagName('div')[0]);
}

function getLastNode(f) {
	var x = f.lastChild;
	while (x.nodeType != 1) {
		x = x.previousSibling;
	}
	return x;
}

function removeLastNode(cloud) {
	cloud.removeChild(getLastNode(cloud));
}

function createRainElements(cloudName, n) {
	var cloud = document.getElementById(cloudName);
	for (var i = 0; i < n; ++i) {
		appendNewNode(cloud);
	}
}

function baseAction(cloudName) {
	var intervalId = -1;
	var cloud = document.getElementById(cloudName);
	var randomTag = 0;
	var lastTemp = 0;

	function randomChange() {
		var temp = Math.floor(Math.random() * screenHeight)+10;
		cloud.getElementsByTagName('div')[lastTemp+1].style.color = 'black';
		if(temp > screenHeight)
			return ;
		cloud.getElementsByTagName('div')[temp].style.color = rgba(4, 221, 4, 1);
		lastTemp = temp;
	}

	function dropRain() {
		appendNewNode(cloud);
		removeLastNode(cloud);
		randomChange();
	}
	intervalId = setInterval(dropRain, Math.floor(Math.random() * 500 + 120));
}

function makeACloud (n) {
	var cloudId = 'cloud' + n;
	var newCloud = document.createElement('div');
	var newDiv = document.createElement('div');
	var newScript = document.createElement('script');
	newCloud.async = true;
	newCloud.id = cloudId;
	newCloud.style.width = "10px";
	newCloud.style.fontSize = "9px";
	newDiv.async = true;
	newScript.async = true;
	newDiv.innerText = 'a';
	newScript.innerText = "createRainElements('" + cloudId + "', " + screenHeight + ");baseAction('" + cloudId + "');"
	newCloud.appendChild(newDiv);
	newCloud.appendChild(newScript);
	return newCloud;
}

function createClouds(n, startNumber) {
	if(startNumber = null)
		startNumber = 0;
	for(var i = 0; i < n; ++i) {
		document.getElementsByTagName('body')[0].appendChild(makeACloud(i + startNumber));
	}
	rowNumber += n;
}

function init() {
	screenWidth = document.body.clientWidth;
	screenHeight = Math.floor(window.screen.availHeight/fontHeight);
	createClouds(screenWidth / divWidth - 4);
	initFlag = true;
	setInterval(printInfo, 20);
}

function adjust () {
	if(initFlag == false)
		return ;
	// 无脑刷新
	window.location.reload();
}

function printInfo() {
	var n = 5;
	var message = "ILOVEPEIPEI".split('');
	for(var i = 0; i < 11; ++i) {
		var cloudName = 'cloud' + (n + i);
		var specialDiv = document.getElementById(cloudName).getElementsByTagName('div');
		specialDiv[7].innerText = specialDiv[5].innerText;
		specialDiv[6].innerText = message[i];
	}
}

window.onresize = adjust;