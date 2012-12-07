var crtx = 0;
var crty = 0;
var crta = 0;
/*
function DEC2HEX(N)
{
	if(N == null)
		return "00";
	N = parseInt(N);
	if(N == 0 || isNaN(N))
		return "00";
	N = Math.max(0, N);
	N = Math.min(255, N);
	N = Math.round(N);

	return "0123456789ABCDEF".charAt((N - N%16)/16) + "0123456789ABCDEF".charAt(N%16);
}
*/

function hexcolor(n)
{
	n = parseInt(n);
	n = Math.max(0, n);
	n = Math.min(n, 0xffffff);
	return rgba((n - (n % 65536))/65536, (n - (n % 256))/256, n % 256);
}

function rgba(red, green, blue, alpha)		// 返回颜色
{
	if(alpha == null || alpha == 100)
		return "rgb(" + red + "," + green + "," + blue +")";
	else
		return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

function move(x, y)
{
	crtx = x;
	crty = y;
}

function line(ctx, length, angle, color, size)	// 上下文、长度、角度、颜色、线宽
{
	ctx.save();
	crta = Math.PI * angle / 180;
	ctx.strokeStyle = color;
	ctx.lineWidth = size;
	ctx.beginPath();
	ctx.moveTo(crtx, crty);
	crtx = crtx + length * Math.cos(crta);
	crty = crty + length * Math.sin(crta);
	ctx.lineTo(crtx, crty);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function spiral_1(ctx)
{
	var len = 0;
	var ang = 0;
	for(len = 0; len < 200; ++len)
	{
		line(ctx, 2 * len, ang, rgba(12, 57, 120), 1);
		ang += 89;
	}
}

function spiral_2(ctx)
{
	var len = 0;
	var ang = 0;
	for(len = 0; len < 200; ++len)
	{
		line(ctx, 2 * len, ang, rgba(222, 65, 90), 1);
		ang += 119;
	}
}

/*
function pos2hex()
{
	var r = Math.abs(crtx - 500);
	var g = Math.abs(crty - 300);
	var b = 120;
	return rgba(r, g, b);
}
*/

function circle(ctx)
{
	var i = 0;
	var j = 0;
	var al = 0;
	var al_2 = 0;

	move(500, 300);
	for(i = 0; i < 24; ++i)
	{
		for(j = 0; j < 36; ++j)
		{
			line(ctx, 25, al, rgba(Math.abs(crtx - 500), Math.abs(crty - 300), 120, 50), 1);
			al += 10;
		}
		al += 15;
	}
}

function colorful(ctx, begin_angle)
{
	var i = 0;
	var ag = begin_angle;
	var r = 0;
	var g = 128;
	var b = 255;
	var r_i = 1;
	var g_i = 1;
	var b_i = 1;

	move(500, 300);
	for(i = 0; i < 800; ++i)
	{
		line(ctx, 1.4 * i, ag, rgba(r, g, b), 1);
		ag = ag + 121;
		r = r + r_i;
		g = g + g_i;
		b = b + b_i;

		if(r > 255)
		{
			r = 245;
			r_i = -1;
		}
		else if(r < 0)
		{
			r = r_i = 1;
		}

		if(g > 255)
		{
			g = 245;
			g_i = -1;
		}
		else if(g < 0)
		{
			g = r_i = 1;
		}
		
		if(b > 255)
		{
			b = 245;
			b_i = -1;
		}
		else if(b < 0)
		{
			b = b_i = 1;
		}
	}
}

function draw(n)
{
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext("2d");

	// 清空画布
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fillRect(0, 0, 1000, 600);

	// 移动到中心
	move(500, 300);

	if(n == 1)
		spiral_1(ctx);
	else if(n == 2)
		spiral_2(ctx);
	else if(n == 3)
		colorful(ctx, 0);
	else	
		circle(ctx);	// 无参数时也会绘制
}
