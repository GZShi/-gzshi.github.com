var screenHeight;
var screenWidth;
var divWidth = 10;
var fontSize = 9;
var fontHeight = 15;
var rowNumber = 0;
var initFlag = false;
var intervalCtrl = [];

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
		if(temp > screenHeight - 2)
			return ;
		cloud.getElementsByTagName('div')[temp].style.color = rgba(4, 221, 4, 1);
		lastTemp = temp;
	}

	function dropRain() {
		appendNewNode(cloud);
		removeLastNode(cloud);
		randomChange();
	}
	intervalId = setInterval(dropRain, Math.floor(Math.random() * 300 + 90));
	return intervalId;
}

function makeACloud (n) {
	var cloudId = n + 'cloud';
	var newCloud = document.createElement('div');
	var newDiv = document.createElement('div');
	newCloud.async = true;
	newCloud.id = cloudId;
	newCloud.style.width = divWidth + "px";
	newCloud.style.fontSize = fontSize + "px";
	newCloud.style.position = "absolute";
	newCloud.style.left = divWidth * n + "px";
	newCloud.style.top = "0px";
	newCloud.style.zIndex = 3;
	newDiv.async = true;
	newDiv.innerText = 'a';
	newCloud.appendChild(newDiv);
	return {cloud: newCloud, id:cloudId};
}

function createClouds(n, startNumber) {
	if(startNumber == null)
		startNumber = 0;
	var cloudInfo;
	for(var i = 0; i < n; ++i) {
		cloudInfo = makeACloud(i + startNumber);
		document.getElementsByTagName('body')[0].appendChild(cloudInfo.cloud);
		createRainElements(cloudInfo.id, screenHeight);
		intervalCtrl.push(baseAction(cloudInfo.id));
	}
	rowNumber += n;
}

function init() {
	screenWidth = document.body.clientWidth;
	screenHeight = Math.floor(window.screen.availHeight/fontHeight);
	createClouds(Math.floor(screenWidth / divWidth + 1));
	initFlag = true;
	setInterval(printInfo, 20);
}



function adjust () {
	if(initFlag == false)
		return ;
	// 无脑刷新
	//window.location.reload();
	var newWidth = document.body.clientWidth;
	if(Math.abs(newWidth - screenWidth) < 10 * divWidth)
		return ;
	if(newWidth - screenWidth > 0) {
		createClouds(Math.floor((newWidth - screenWidth)/divWidth), rowNumber);
	}
	else {
		var n = Math.floor((screenWidth - newWidth)/divWidth);
		var bodyNode = document.getElementsByTagName("body")[0];
		for(var i = 0; i < n; ++i) {
			clearInterval(intervalCtrl.pop());
			bodyNode.removeChild(bodyNode.lastChild);
			rowNumber -= 1;
			//deleteBodyChildById(rowNumber - 1 + "cloud");
		}
	}
	screenWidth = newWidth;
}

function printInfo() {
	var n = 5;
	var message = "ILOVEPEIPEI".split('');
	for(var i = 0; i < 11; ++i) {
		var cloudName = (n + i) + 'cloud';
		var specialDiv = document.getElementById(cloudName).getElementsByTagName('div');
		specialDiv[7].innerText = specialDiv[5].innerText;
		specialDiv[6].innerText = message[i];
	}
}

window.onresize = adjust;