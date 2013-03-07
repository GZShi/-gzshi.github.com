var screenHeight;
var screenWidth;
var divWidth = 10;
var fontHeight = 15;
var rowNumber = 0;
var initFlag = false;

function appendNewNode(cloudName) {
	var cloud = document.getElementById(cloudName);
	var newDiv = document.createElement('div');
	newDiv.async = true;
	newDiv.innerText = 'abc_def_ghijklm_nopqrst.uvwx.yz'.split('')[Math.floor(Math.random() * 26)];
	cloud.insertBefore(newDiv, cloud.getElementsByTagName('div')[0]);
}
function getLastNode(f) {
	var x = f.lastChild;
	while (x.nodeType != 1) {
		x = x.previousSibling;
	}
	return x;
}

function removeLastNode(cloudName) {
	var cloud = document.getElementById(cloudName);
	cloud.removeChild(getLastNode(cloud));
}

function createRainElements(cloudName, n) {
	var cloud = document.getElementById(cloudName);
	for (var i = 0; i < n; ++i) {
		appendNewNode(cloudName);
	}
}

function baseAction(cloudName) {
	var intervalId = -1;
	var cloud = document.getElementById(cloudName);
	var randomTag = 0;

	function randomChange() {
		if (randomTag < 20) {
			++randomTag;
			return;
		}
		randomTag = 0;
		cloud.getElementsByTagName('div')[Math.floor(Math.random() * screenHeight)].innerText = "0";

	}

	function dropRain() {
		appendNewNode(cloudName);
		removeLastNode(cloudName);
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
	screenHeight = Math.floor(document.body.clientHeight/fontHeight);
	createClouds(screenWidth / divWidth - 4);
	initFlag = true;
}

function adjust () {
	if(initFlag == false)
		return ;
	window.location.reload();
}

window.onresize = adjust;