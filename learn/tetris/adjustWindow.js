function setFramePosition () {
	var frame = document.getElementById('frame');
	var cover = document.getElementById('cover');
	if(document.body.clientWidth < 500) {
		frame.style.left = "0px";
		cover.style.left = "0px";
	}
	else{
		var temp = (document.body.clientWidth - 500) / 2;
		frame.style.left = temp + "px";
		cover.style.left = temp - 2 + "px";
	}
	if(document.body.clientHeight < 500) {
		frame.style.top = "5px";
		cover.style.top = "3px";
	}
	else{
		var temp = (document.body.clientHeight - 500) / 2;
		frame.style.top = temp + "px";
		cover.style.top = temp + "px";
	}

}