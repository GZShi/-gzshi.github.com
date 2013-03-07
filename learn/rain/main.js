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
	newDiv.innerText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*_'.split('')[Math.floor(Math.random() * 62)];
	newDiv.style.color = rgba(4, 221, 4, Math.random() * 0.5 + 0.4);
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

	function randomChange() {
		var temp = Math.floor(Math.random() * screenHeight)+10;
		if(temp > screenHeight)
			return ;
		cloud.getElementsByTagName('div')[temp].innerText = ' ';

	}

	function dropRain() {
		appendNewNode(cloud);
		removeLastNode(cloud);
		randomChange();
	}
	intervalId = setInterval(dropRain, Math.floor(Math.random() * 200 + 90));
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
}

function adjust () {
	if(initFlag == false)
		return ;
	window.location.reload();
}

window.onresize = adjust;