var current_x = 0;
var current_y = 0;
var current_radian = 0;
var interval_id = 0;
var canvas_center_x = 500;	// 默认值
var canvas_center_y = 300;	// 默认值


function hexcolor(n)
{
	n = parseInt(n);
	n = Math.max(0, n);
	n = Math.min(n, 0xffffff);
	return rgba((n - (n % 65536))/65536, (n - (n % 256))/256, n % 256);
}

function rgba(red, green, blue, alpha)		// 返回颜色字符串
{
	if(alpha == null || alpha == 100)
		return "rgb(" + red + "," + green + "," + blue +")";
	else
		return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

function move(x, y)
{
	current_x = x;
	current_y = y;
}

function line(ctx, length, angle, color, size)	// 上下文、长度、角度、颜色、线宽
{
	ctx.save();
	current_radian = Math.PI * angle / 180;
	ctx.strokeStyle = color;
	ctx.lineWidth = size;
	ctx.beginPath();
	ctx.moveTo(current_x, current_y);
	current_x = current_x + length * Math.cos(current_radian);
	current_y = current_y + length * Math.sin(current_radian);
	ctx.lineTo(current_x, current_y);
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
	var r = Math.abs(current_x - 500);
	var g = Math.abs(current_y - 300);
	var b = 120;
	return rgba(r, g, b);
}
*/

function circle(ctx)
{
	var i = 0;
	var j = 0;
	var small_radian = 0;


	move(canvas_center_x, canvas_center_y);
	for(i = 0; i < 24; ++i)
	{
		for(j = 0; j < 36; ++j)
		{
			line(ctx, 25, small_radian, rgba(Math.abs(current_x - 500), Math.abs(current_y - 300), 120, 50), 1);
			small_radian += 10;
		}
		small_radian += 15;
	}
}

function colorful(ctx, begin_angle)
{
	var i = 0;
	var ag = begin_angle;
	var r = 0;
	var g = 128;
	var b = 255;
	var red_step = 1;
	var green_step = 1;
	var blue_step = 1;

	move(canvas_center_x, canvas_center_y);
	for(i = 0; i < 1800; ++i)
	{
		line(ctx, 1.4 * i, ag, rgba(r, g, b), 1);
		ag = ag + 121;

		// 颜色变换方式一
		r = r + (red_step   = (r >= 255 ? -1 : (r <= 0 ? 1 : red_step)));
		g = g + (green_step = (g >= 255 ? -1 : (g <= 0 ? 1 : green_step)));
		b = b + (blue_step  = (b >= 255 ? -1 : (b <= 0 ? 1 : blue_step)));

		// 颜色变换方式二
/*
		if(r > 255)
		{
			r = 245;
			red_step = -1;
		}
		else if(r < 0)
		{
			r = red_step = 1;
		}

		if(g > 255)
		{
			g = 245;
			green_step = -1;
		}
		else if(g < 0)
		{
			g = red_step = 1;		// bug 不过貌似这样画出来的图形也很漂亮
		}
		
		if(b > 255)
		{
			b = 245;
			blue_step = -1;
		}
		else if(b < 0)
		{
			b = blue_step = 1;
		}
		*/
	}
}

function draw(n)
{
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext("2d");

	// 停止动画（如果有的话）
	clearInterval(interval_id);

	// 清空画布
	ctx.clearRect(0, 0, 1000, 600);

	// 移动到中心
	move(canvas_center_x, canvas_center_y);

	switch(n)
	{
		case 1:
			spiral_1(ctx);
			break;
		case 2:
			spiral_2(ctx);
			break;
		case 3:
			colorful(ctx, 0);
			break;
		default:
			circle(ctx);
			break;
	}
}

var i = 0;

// 绘制一帧
function frame()
{
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext("2d");

	// 每一帧都要清空画布
	ctx.clearRect(0, 0, 2 * canvas_center_x, 2 * canvas_center_y); 

	move(canvas_center_x, canvas_center_y);

	// 每一次调用初始角度都有变化
	colorful(ctx, --i);
}

function antimate()
{
	interval_id = setInterval(frame, 20);
}

var scrollInterval_id = 0;

function save()
{
	var canvas = document.getElementById("mycanvas");
	var img_src = canvas.toDataURL("image/png");
	var image = document.getElementById("myimage");
	image.setAttribute("src", img_src);
	document.getElementById("tipstext").innerHTML = "将下图右键另存为即可";
	scrollInterval_id = setInterval(scrollDown, 25);
	//document.write('<img src="' + img_src + '"/>');

}

var scrollTimes = 0;

function scrollDown()
{
	if(scrollTimes >= 66)
	{
		clearInterval(scrollInterval_id);
		scrollTimes = 0;
	}
	else
	{
		window.scrollBy(0, 2+scrollTimes);
		scrollTimes++;
	}
}