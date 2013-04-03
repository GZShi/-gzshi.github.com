function message(msg) {
	$("p#message").text(msg);
}

function displayScore(score) {
	message("Your Score: " + score);
	$("div#infoBoard").animate({
		fontSize: '30px',
		marginTop: Math.floor($(window).height()*0.33 - 20) + 'px'
	}, 300);
}

function onConfirm() {
	var m = 0;
	if($("#smallMode")[0].checked)
		m = "small";
	else if($("#newtonMode")[0].checked)
		m = "newton";
	else if($("#threeball")[0].checked)
		m = "3balls";
	else if($("#snooker")[0].checked)
		m = "snooker";
	return {
		mode: m,
		total: parseInt($("#amount")[0].value),
		ax: parseInt($("#directx")[0].value),
		ay: parseInt($("#directy")[0].value),
		rv: Math.max(Math.min(parseInt($("#rv")[0].value), 100), 0)
	}
}