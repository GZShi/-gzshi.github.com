var Style, offset = 1, timer, dir = 1;
document.onmousecover = function()
{
	with(event.srcElement)
	//if(tageName == "IMG" && className == "shade")
	if(relName == "full-article")
	{
		Style = style;
		shade();
	}
}

document.onmouseout = function()
{
	if(Style)
	{
		clearTimeout(timer);
		style.posTop = Style.posLeft = 0;
	}
}

function shade()
{
	eval("Style.pos" + ["Top", "Left"][(dir += dir < 4 ? 1 : -3) %2] + "+=offset*(dir - 3 + dir %2)");
	timer = setTimeout("shadow()", 50);
}