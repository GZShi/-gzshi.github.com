function snake(argc_color, argc_x, argc_y, direction)
{
	this.body_x = [argc_x];
	this.body_y = [argc_y];
	this.length = 1;
	this.direction = direction;
	this.key_code = 1;
	this.speed = 7;
	this.alive = true;
	this.step_count = 0;
	this.color = argc_color;
	this.grid_size = 10;

	this.head_x = function ()
	{
		return this.body_x[this.length - 1];
	}

	this.head_y = function ()
	{
		return this.body_y[this.length - 1];
	}

	this.hit_me = function (head_x, head_y)
	{
		for (var i = 0; i < this.length; ++i)
		{
			if(head_x == this.body_x[i] && head_y == this.body_y[i])
				return true;
		}
		return false;
	}

	this.hit_self = function ()
	{
		for(var i = this.length - 2; i > 0; --i)
		{
			if(this.body_x[i] == this.body_x[this.length - 1] && this.body_y[i] == this.body_y[this.length - 1])
				return true;
		}
		return false;
	}

	this.speed_decrease = function()
	{
		this.speed += 1;
		if(this.speed >= 10)
			this.speed = 10;
	}

	this.speed_increase = function()
	{
		this.speed -= 1;
		if(this.speed <= 6)
			this.speed = 6;
	}

	this.update_direction = function ()
	{
		if((this.key_code == this.direction) || (this.key_code + this.direction == 0))
			return ;
		else
		{
			this.direction = this.key_code;
			this.step_count += 1;
		}
	}

	this.update_body = function ()
	{
		var new_x = this.body_x[this.length - 1];
		var new_y = this.body_y[this.length - 1];

		switch(this.direction)
		{
			case -1: 	new_y--;	break;
			case 1: 	new_y++;	break;
			case 2: 	new_x++;	break;
			case -2: 	new_x--;	break;
			default: 	this.direction = 1; new_y++; break;
		}
		this.body_x.push(new_x);
		this.body_y.push(new_y);
		this.length += 1;
	}

	this.draw_me = function(ctx)
	{
		ctx.fillStyle = this.color;
		for (var i = 0; i < this.length; ++i)
		{
			//alert(i);
			ctx.fillRect(this.body_x[i] * this.grid_size, this.body_y[i] * this.grid_size, this.grid_size, this.grid_size);
		}
	}
}

function wall()
{
	this.left = 0;
	this.right = 30;
	this.up = 0;
	this.down = 30;

	this.hit_me = function (head_x, head_y) 
	{

		if(head_x < this.left || head_x >= this.right || head_y < this.up || head_y >= this.down)
		{
			return true;
		}
		return false;
	}
}

function food()
{
	// hello! I'm Mr. Food :-)
	this.x = [0, 29, 14];
	this.y = [0, 29, 14];
	this.style = [1, -1, 0];		// 黑 红 绿
	this.n = 3;
	this.grid_size = 10;

	// 如果被吃掉则返回被吃掉的类型，否则返回-2
	this.been_eaten = function (head_x, head_y)
	{
		for (var i = 0; i < this.n; ++i)
		{
			if(head_x == this.x[i] && head_y == this.y[i])
			{
				// 设置食物坐标为-1，为调用食物生成函数做准备
				this.x[i] = -1;
				this.y[i] = -1;
				return this.style[i];
			}
		}
		return -2;
	}

	this.create_food = function (hit_black, hit_red)
	{
		for(var i = 0; i < this.n; ++i)
		{
			if(this.x[i] == -1)
			{
				var new_x = Math.floor(Math.random() * 30);
				var new_y = Math.floor(Math.random() * 30);
				while(hit_red(new_x, new_y) || hit_black(new_x, new_y))
				{
					new_x = Math.floor(Math.random() * 30);
					new_y = Math.floor(Math.random() * 30);
				}
				this.x[i] = new_x;
				this.y[i] = new_y;
				break ;
			}
		}
	}

	this.draw_me = function(ctx)
	{
		for (var i = 0; i < this.n; ++i)
		{
			switch (this.style[i])
			{
				case -1: 	ctx.fillStyle = "#f54114";	break;
				case 0: 	ctx.fillStyle = "#51a511";	break;
				case 1: 	ctx.fillStyle = "#030b41";	break;
				default: 	ctx.fillStyle = "#00ff00";	break;
			}
			ctx.fillRect(this.x[i] * this.grid_size, this.y[i] * this.grid_size, this.grid_size, this.grid_size)
		}
	}
}

function game_running()
{
	var mr_wall     = new wall();
	var mr_food     = new food();
	var snake_black = new snake('#010101', 9, 9, 1);
	var snake_red   = new snake('#ff0000', 20, 20, -1);

	var counter = 0;

	var ctx = document.getElementById("snake_canvas").getContext("2d");
	var pause_flag = true;
	var black_head_x = 0;
	var black_head_y = 0;
	var red_head_x = 0;
	var red_head_y = 0;

// 初始化速度
	//snake_black.speed = 8;
	//snake_red.speed = 96;
	ctx.fillStyle = 'rgba(22, 14, 77, 0.52)';
	ctx.font = '12pt consolas';
	ctx.fillText("Press 'p' to start", 65, 100);
	function draw_element(ctx)
	{
		ctx.clearRect(0, 0, 300, 300);
		mr_food.draw_me(ctx);
		snake_black.draw_me(ctx);
		snake_red.draw_me(ctx);
	}

	function update_data(n)
	{
		// 先调整方向，再调整身体。否则操作感会下降
		// alert(n % snake_black.speed);
		if(n % snake_black.speed == 0)
		{
			snake_black.update_direction();
			snake_black.update_body();
		}
		if(n % snake_red.speed == 0)
		{
			snake_red.update_direction();
			snake_red.update_body();
		}
	}

	function check_data(n)
	{
		// 将蛇头的数据缓存，避免反复调用函数，提高效率
		black_head_x = snake_black.head_x();
		black_head_y = snake_black.head_y();
		red_head_x = snake_red.head_x();
		red_head_y = snake_red.head_y();

		// 优先进行食物接触分析，因为这涉及到蛇身数据的修改
		if(n % snake_black.speed == 0)
		{
			switch(mr_food.been_eaten(black_head_x, black_head_y))
			{
			case -2:
				snake_black.body_x.shift();
				snake_black.body_y.shift();
				mr_food.create_food(snake_black.hit_me, snake_red.hit_me);
				snake_black.length -= 1;
				break;
			case -1: 	//红色食物
				snake_red.speed_decrease();
				snake_red.speed < 6 ? (snake_red.speed = 6) : true;
				break;
			case 1: 	// 黑色食物
				snake_black.speed_increase();
				snake_black.speed > 8 ? (snake_black.speed = 8) : true;
				snake_black.body_x.shift();
				snake_black.body_y.shift();
				mr_food.create_food(snake_black.hit_me, snake_red.hit_me);
				snake_black.length -= 1;
				break;
			default:
				break;
			}
		}
		
		if(n % snake_red.speed == 0)
		{
			switch(mr_food.been_eaten(red_head_x, red_head_y))
			{
			case -2:
				snake_red.body_x.shift();
				snake_red.body_y.shift();
				mr_food.create_food(snake_black.hit_me, snake_red.hit_me);
				snake_red.length -= 1;
				break;
			case 1: 	// 黑色食物
				snake_black.speed_decrease();
				snake_black.speed < 6 ? (snake_black.speed = 6) : true;
				break;
			case -1: 	// 红色食物
				snake_red.speed_increase();
				snake_red.speed > 8 ? (snake_red.speed = 8) : true;
				snake_red.body_x.shift();
				snake_red.body_y.shift();
				mr_food.create_food(snake_black.hit_me, snake_red.hit_me);
				snake_red.length -= 1;
				break;
			default:
				break;
			}
		}
		if(mr_wall.hit_me(black_head_x, black_head_y) || snake_red.hit_me(black_head_x, black_head_y) || snake_black.hit_self())
			snake_black.alive = false;
		if(mr_wall.hit_me(red_head_x, red_head_y) || snake_black.hit_me(red_head_x, red_head_y) || snake_red.hit_self())
			snake_red.alive = false;
	}

	function play_game()
	{
		counter++;
		if(counter >= 14000)
			counter = 0;
		// 简化判断逻辑
		if(snake_red.alive && snake_black.alive)
		{
			update_data(counter);
			draw_element(ctx);
			check_data(counter);
		}
		else
		{
			clearInterval(interval_id);
			interval_id = -1;
			ctx.fillStyle = 'rgb(22, 14, 77)';
			ctx.font = '14pt consolas';
			var message = snake_red.alive ? 'red snake win!!' : (snake_black.alive ? 'black snake win!!' : 'perish together..');
			ctx.fillText(message, 65, 100);
		}
	}

	//var interval_id = setInterval(play_game, 180);

	document.onkeydown = function(e)
	{
		e = window.event || e;
		switch(e.keyCode)
		{
			case 37: 	// left
				snake_black.key_code = -2;
				break;
			case 38: 	// Up
				snake_black.key_code = -1;
				break;
			case 39: 	// Right
				snake_black.key_code = 2;
				break;
			case 40: 	// Down
				snake_black.key_code = 1;
				break;
			case 65: 	// a - left
				snake_red.key_code = -2;
				break;
			case 87: 	// w - up
				snake_red.key_code = -1;
				break;
			case 68: 	// d - right
				snake_red.key_code = 2;
				break;
			case 83: 	// s - down
				snake_red.key_code = 1;
				break;
			case 80: 	// p - pause
				pause_flag = !pause_flag;
				if(pause_flag)
				{
					clearInterval(interval_id);
					interval_id = -1;
				}
				else
					interval_id = setInterval(play_game, 20);
			default: 
				break;
		}
		//alert("key down : " + e.keyCode);
	}
}

