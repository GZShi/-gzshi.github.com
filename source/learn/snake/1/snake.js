var wall_left_x = 0;
var wall_right_x = 10;
var wall_up_y = 0;
var wall_down_y = 10;

var grid_size = 10;
var snake_x = [1, 1, 1];
var snake_y = [1, 2, 3];
var snake_length = 3;
var snake_direction = 1;
var your_enter = 1;
var food_x = 3;
var food_y = 3;

var game_status = 'pause';
var flag_hit_wall = false;
var flag_hit_self = false;

var interval_id = 0;

// 获取蛇头 x坐标
function get_snake_head_x()
{
	return snake_x[snake_length - 1];
}

// 获取蛇头 y坐标
function get_snake_head_y()
{
	return snake_y[snake_length - 1];
}

// 测试自杀
function check_hit_self(x, y)
{
	for(var i = 0; i < snake_length; ++i)
	{
		if((snake_x[i] == x) && (snake_y[i] == y))
			return true;
	}
	return false;
}

// 测试撞墙
function check_hit_wall(x, y)
{
	if(x < wall_left_x || x >= wall_right_x || y < wall_up_y || y >= wall_down_y)
		return true;
	return false;
}

// 测试吃食物
function check_hit_food(x, y)
{
	if(x == food_x && y == food_y)
		return true;
	return false;
}

// 更新方向
function update_direction(your_enter)
{
	if((your_enter == snake_direction) || (your_enter + snake_direction == 0))
		return ;
	else
		snake_direction = your_enter;
}

// 更新蛇身的坐标
function update_snake()
{
	if(game_status == 'pause')
		return ;
	var new_x = snake_x[snake_length - 1];
	var new_y = snake_y[snake_length - 1];

	switch(snake_direction)
	//switch(your_enter)
	{
		case -1: 	new_y--;	break;
		case 1: 	new_y++;	break;
		case 2: 	new_x++;	break;
		case -2: 	new_x--;	break;
		default: 	snake_direction = 1; new_y++; break;
	}
	if(check_hit_self(new_x, new_y))
		flag_hit_self = true;
	else if(check_hit_wall(new_x, new_y))
		flag_hit_wall = true;
	else
	{
		if(!check_hit_food(new_x, new_y))
		{
			snake_x.shift();
			snake_y.shift();
		}
		else	// 吃到食物
		{
			snake_length++;
			create_food_pos();
		}
		snake_x.push(new_x);
		snake_y.push(new_y);
	}
}


// 画一节蛇身
function draw_snake_node(ctx, x, y)
{
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(x * grid_size, y * grid_size, grid_size, grid_size);
}

// 画整条蛇
function draw_snake(ctx)
{
	for(var i = 0; i < snake_length; ++i)
	{
		draw_snake_node(ctx, snake_x[i], snake_y[i]);
	}
}

// 画食物
function draw_food(ctx)
{
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(food_x * 10, food_y * 10, 10, 10);
}

// 随机生成食物坐标
function create_food_pos()
{
	while(true)
	{
		var x = Math.floor(Math.random()* (wall_right_x - 1) + 1);
		var y = Math.floor(Math.random()* (wall_down_y - 1) + 1);
		if(!check_hit_self(x, y))
		{
			food_x = x;
			food_y = y;
			break;
		}
	}
}

function draw_a_frame()
{
	update_direction(your_enter);
	update_snake();

	if(flag_hit_wall || flag_hit_self)
	{
		clearInterval(interval_id);
		interval_id = -1;
		var tips = "获得成就：";
		if(snake_length > 100)
			tips += "纳尼！不科学！";
		else if(snake_length >= 90)
			tips += "很幸运的骨灰级训莽大湿！";
		else if(snake_length >= 80)
			tips += "骨灰级无敌训莽大湿！";
		else if(snake_length >= 70)
			tips += "传说中的训莽大湿！";
		else if(snake_length >= 65)
			tips += "作者好感动！";
		else if(snake_length >= 59)
			tips += "用生命在玩游戏！";
		else if(snake_length >= 47)
			tips += "贪吃蛇脑残粉！";
		else if(snake_length >= 43)
			tips += "好累，感觉不会再爱了！";
		else if(snake_length >= 30)
			tips += "作者想不出成就名称啦！";
		else if(snake_length >= 25)
			tips += "超越少年3.1415！";
		else if(snake_length >= 22)
			tips += "人蛇合一！";
		else if(snake_length >= 19)
			tips += "西域蛇王！";
		else if(snake_length >= 17)
			tips += "究极吃货！";
		else if(snake_length >= 15)
			tips += "新手吃货！";
		else if(snake_length >= 13)
			tips += "渐入佳境！";
		else if(snake_length >= 11)
			tips += "我是吃货我自豪！";
		else if(snake_length >= 7)
			tips += "没有做吃货的天赋~";
		else if(snake_length > 3)
			tips += "我果然不是吃货!";
		else
			tips += "不带走一片食物……";
		if(flag_hit_self)
			alert(tips + "\n\n┏ (゜ω゜)=☞多吃绿色蔬菜才健康~");
		else if(flag_hit_wall)
			alert(tips + "\n\no(>﹏<)o 活动范围太小？请期待增强版~")
	}
	var ctx = document.getElementById("snake_canvas").getContext("2d");
	ctx.clearRect(0, 0, wall_right_x * 10, wall_down_y * 10); 

	draw_food(ctx);
	draw_snake(ctx);
}

function game_running()
{
	interval_id = setInterval(draw_a_frame, 150);
}

document.onkeydown = function(e)
{
	e = window.event || e;
	switch(e.keyCode)
	{
		case 37: 	
			your_enter = -2;	
			break;
		case 38:
			your_enter = -1
			break;
		case 39:
			your_enter = 2;
			break;
		case 40:
			your_enter = 1;
			if(game_status == 'pause')
				game_status = 'running';
			break;
		default: 
			if(game_status == 'pause')
				game_status == 'running';
			else
				game_status == 'pause';
			break;
	}
}

