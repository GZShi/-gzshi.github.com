function my_rgba(red, green, blue, alpha)
{
	if(alpha == null)
		return 'rgb(' + red + ',' + green +',' + blue +')';
	else
		return 'rgba(' + red + ',' + green +',' + blue + ',' + alpha + ')';
}

function snake(argc_color, argc_x, argc_y, direction)
{
	this.body_x = [argc_x];
	this.body_y = [argc_y];
	this.length = 1;
	this.direction = direction;
	this.key_code = 1;
	this.speed = 14;
	this.alive = true;
	this.step_count = 0;
	this.color = argc_color;
	this.grid_size = 10;
	this.red_element = 0;
	this.green_element = 0;
	this.blue_element = 0;

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
		if(this.speed >= 20)
			this.speed = 20;
	}

	this.speed_increase = function()
	{
		this.speed -= 1;
		if(this.speed <= 2)
			this.speed = 2;
	}

	this.update_direction = function (key_queue)
	{
		var temp = 0;
		while(key_queue.length > 0)
		{
			temp = key_queue.shift();
			if(temp != this.direction && temp + this.direction != 0)
			{
				this.direction = temp;
				this.step_count += 1;
				break;
			}
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
		//ctx.fillStyle = this.color;
		for (var i = 0; i < this.length; ++i)
		{
			//alert(i);
			ctx.fillStyle = my_rgba(this.red_element, this.green_element, this.blue_element, ((i + 1)/ this.length));
			ctx.fillRect(this.body_x[i] * this.grid_size, this.body_y[i] * this.grid_size, this.grid_size, this.grid_size);
		}
	}

	this.change_color = function ()
	{
		this.red_element = Math.floor(Math.random()*100 + 75);
		this.green_element = Math.floor(Math.random()*100 + 75);
		this.blue_element = Math.floor(Math.random()*100 + 75);
	}
}

function wall()
{
	this.left = 0;
	this.right = 30;
	this.up = 0;
	this.down = 30;

	this.hit_me = function (snake_x, snake_y) 
	{
		if(snake_x[snake_x.length - 1] < this.left)
		{
			snake_x[snake_x.length - 1] = this.right - 1;
		}
		else if(snake_x[snake_x.length - 1] >= this.right)
		{
			snake_x[snake_x.length - 1] = 0;
		}	
		else if(snake_y[snake_y.length - 1] < this.up)
		{
			snake_y[snake_y.length - 1] = this.down - 1;
		}	
		else if(snake_y[snake_y.length - 1] >= this.down)
		{
			snake_y[snake_y.length - 1] = this.up;
		}	
	}
}

function food()
{
	// hello! I'm Mr. Food :-)
	this.x = [5, 24, 14];
	this.y = [5, 24, 14];
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

	this.create_food = function (hit_black)
	{
		for(var i = 0; i < this.n; ++i)
		{
			if(this.x[i] == -1)
			{
				var new_x = 5 + Math.floor(Math.random() * 20);
				var new_y = 5 + Math.floor(Math.random() * 20);
				for(var j = 0; j < this.n; ++j)
				{
					if(new_x == this.x[i] && new_y == this.y[i])
					{
						new_x = 5 + Math.floor(Math.random() * 20);
						new_y = 5 + Math.floor(Math.random() * 20);
						j = 0;
					}
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
	var key_queue_black = [];
	var counter     = 0;

	var canvas 		= document.getElementById("snake_canvas");
	var ctx         = canvas.getContext("2d");
	var pause_flag  = true;
	var interval_id = -1;
	var fresh_time  = 15;

	var black_head_x = 0;
	var black_head_y = 0;
	var mouse_x = 0;
	var mouse_y = 0;

	ctx.fillStyle = 'rgba(22, 14, 77, 0.52)';
	ctx.font = '12pt consolas';
	ctx.fillText("Touch me to start", 65, 100);
// 初始化速度
	//snake_black.speed = 8;
	//snake_red.speed = 996;
	function draw_element(ctx)
	{
		ctx.clearRect(0, 0, 300, 300);
		mr_food.draw_me(ctx);
		snake_black.draw_me(ctx);
	}

	function update_data(n)
	{
		// 先调整方向，再调整身体。否则操作感会下降
		// alert(n % snake_black.speed);
		if(n % snake_black.speed == 0)
		{
			snake_black.update_direction(key_queue_black);
			snake_black.update_body();
		}
	}

	function check_data(n)
	{
		// 将蛇头的数据缓存，避免反复调用函数，提高效率
		black_head_x = snake_black.head_x();
		black_head_y = snake_black.head_y();

		// 优先进行食物接触分析，因为这涉及到蛇身数据的修改
		if(n % snake_black.speed == 0)
		{
			var food_status = mr_food.been_eaten(black_head_x, black_head_y);
			if(food_status == -2)
			{
				snake_black.body_x.shift();
				snake_black.body_y.shift();
				snake_black.length -= 1;
			}
			else
			{
				mr_food.create_food(snake_black.hit_me);
				if(food_status == -1)
					snake_black.speed_decrease();
				else if(food_status == 1)
					snake_black.speed_increase();
				else
					snake_black.change_color();
			}
		}
		
		mr_wall.hit_me(snake_black.body_x, snake_black.body_y);

		if(snake_black.hit_self())
			snake_black.alive = false;
	}

	function play_game()
	{
		counter++;
		if(counter >= 14000)
			counter = 0;
		// 简化判断逻辑
		if(snake_black.alive)
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
			var message = 'Game Over!';
			ctx.fillText(message, 65, 100);
			ctx.fillStyle = 'rgba(22, 14, 77, 0.52)';
			ctx.font = '12pt consolas';
			ctx.fillText("Touch me to restart", 65, 120);
			pause_flag = true;
		}
	}

	function restart()
	{
		ctx.clearRect(0, 0, 300, 300);
		mr_wall     = new wall();
		mr_food     = new food();
		snake_black = new snake('#010101', 9, 9, 1);
		key_queue_black = [];
		counter     = 0;
		if(interval_id != -1)
			clearInterval(interval_id);
		ctx.fillStyle = 'rgba(22, 14, 77, 0.52)';
		ctx.font = '12pt consolas';
		ctx.fillText("Touch me to start", 65, 100);
	}

	

	function getTouchPos(canvas, evt)
	{
		var rect = canvas.getBoundingClientRect();
		var touch = evt.touches[0];
		return {x: touch.pageX - rect.left, y: touch.pageY - rect.top};
	}
/*
	window.addEventListener('keydown', function(evt) {
		if(pause_flag == true)
			return ;
		switch(evt.keyCode)
		{
			case 37: 	// left
				key_queue_black.push(-2);
				break;
			case 38: 	// Up
				key_queue_black.push(-1);
				break;
			case 39: 	// Right
				key_queue_black.push(2);
				break;
			case 40: 	// Down
				key_queue_black.push(1);
				break;
			default:
				break;
		}
	}, false);
*/
	canvas.addEventListener('touchstart', function(evt) {
		var mousePos = getTouchPos(canvas, evt);
		var mouse_x = Math.floor(mousePos.x / 10);
		var mouse_y = Math.floor(mousePos.y / 10);
		var snake_x = snake_black.head_x();
		var snake_y = snake_black.head_y();
		var snake_direction = snake_black.direction;
		
		if(pause_flag == true)
		{
			if(snake_black.alive)
			{
				interval_id = setInterval(play_game, fresh_time);
				pause_flag = false;
			}
			else
			{
				restart();
			}
			return ;
		}
		if(Math.abs(snake_x - mouse_x) > Math.abs(snake_y - mouse_y))
		{
			if(snake_x > mouse_x)
			{
				if(snake_direction == 2)
				{
					if(mouse_y < snake_y)
						key_queue_black.push(-1);
					else if(mouse_y > snake_y)
						key_queue_black.push(1);
				}
				key_queue_black.push(-2); // left
			}
			else //if(snake_x < mouse_x)
			{
				if(snake_direction == -2)
				{
					if(mouse_y < snake_y)
						key_queue_black.push(-1);
					else if(mouse_y > snake_y)
						key_queue_black.push(1);
				}
				key_queue_black.push(2); // right
			}
		}
		else //if(Math.abs(snake_x - mouse_x) < Math.abs(snake_y - mouse_y))
		{
			if(snake_y > mouse_y)
			{
				if(snake_direction == 1)
				{
					if(mouse_x < snake_x)
						key_queue_black.push(-2);
					else if(mouse_x > snake_x)
						key_queue_black.push(2);
				}
				key_queue_black.push(-1); // up
			}
			else //if(snake_y < mouse_y)
			{
				if(snake_direction == -1)
				{
					if(mouse_x < snake_x)
						key_queue_black.push(-2);
					else if(mouse_x > snake_x)
						key_queue_black.push(2);
				}
				key_queue_black.push(1); // down
			}
		}
	}, false); 
}

