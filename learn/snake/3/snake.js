function snake(argc_color, argc_x, argc_y, direction)
{
	this.body_x = [argc_x];
	this.body_y = [argc_y];
	this.length = 1;
	this.direction = direction;
	this.key_code = 1;
	this.speed = 1;
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
		//alert(this.body_x);
		//alert(this.body_x);
		//alert(new_x);
		//alert(new_y);
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
	this.x = [0, 29];
	this.y = [0, 29];
	this.style = [1, -1];
	this.n = 2;
	this.grid_size = 10;

	this.been_eaten = function (head_x, head_y)
	{
		//alert(head_x + " " + head_y + " " + this.x + " " + this.y);
		for (var i = 0; i < this.n; ++i)
		{
			if(head_x == this.x[i] && head_y == this.y[i])
			{
				// create new food pos
				this.x[i] = Math.floor(Math.random() * 30);
				this.y[i] = Math.floor(Math.random() * 30);
				return true;
			}
		}
		return false;
	}

	this.draw_me = function(ctx)
	{
		for (var i = 0; i < this.n; ++i)
		{
			switch (this.style[i])
			{
				case -1: 	ctx.fillStyle = "#00ff00";	break;
				case 0: 	ctx.fillStyle = "#000ff0";	break;
				case 1: 	ctx.fillStyle = "#0ff000";	break;
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
	var ctx = document.getElementById("snake_canvas").getContext("2d");
	var pause_flag = true;

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

	function update_data()
	{
		snake_black.update_body();
		snake_black.update_direction();
		snake_red.update_body();
		snake_red.update_direction();
	}

	function check_data()
	{
		if(mr_wall.hit_me(snake_black.head_x(), snake_black.head_y()) || snake_red.hit_me(snake_black.head_x(), snake_black.head_y()))
			snake_black.alive = false;
		if(mr_wall.hit_me(snake_red.head_x(), snake_red.head_y()) || snake_black.hit_me(snake_red.head_x(), snake_red.head_y()))
			snake_red.alive = false;
		if(false == mr_food.been_eaten(snake_black.head_x(), snake_black.head_y()))
		{
			snake_black.body_x.shift();
			snake_black.body_y.shift();
			snake_black.length -= 1;
		}
		if(false == mr_food.been_eaten(snake_red.head_x(), snake_red.head_y()))
		{
			snake_red.body_x.shift();
			snake_red.body_y.shift();
			snake_red.length -= 1;
		}
	}

	function play_game()
	{
		update_data();
		draw_element(ctx);
		check_data();
		if(false == snake_red.alive || false == snake_black.alive)
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
					interval_id = setInterval(play_game, 180);
			default: 
				break;
		}
		//alert("key down : " + e.keyCode);
	}
}

