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
	return {
		mode: $("#smallMode")[0].checked,
		total: parseInt($("#amount")[0].value),
		ax: parseInt($("#directx")[0].value),
		ay: parseInt($("#directy")[0].value),
		rv: Math.max(Math.min(parseInt($("#rv")[0].value), 100), 0)
	}
}