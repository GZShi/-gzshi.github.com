var node_size = 10;
var max_x = 30;
var max_y = 30;
function snake (arg_name, arg_color, arg_speed, arg_direction) {
// 属性
	var name 		= arg_name;
	var color  		= arg_color;
	var speed  		= arg_speed;
	var direction  	= arg_direction;
	var body_x		= [0];
	var body_y		= [0];
	var body_len	= 1;
	var step_size   = 1;
	var steps       = 0;
	var alive		= true;

// 临时变量
	var temp_x;
	var temp_y;

// 中间函数
	function reserve_direction(argc) {
		switch(argc)
		{
			case 'east': return 'west';
			case 'west': return 'east';
			case 'south': return 'north';
			case 'north': return 'south';
			default: return '';
		}
	}

	function change_color() {
		;
	}
// 动作
	this.change_direction = function (commands) {
		while(commands.length > 0){
			var new_direction = commands.shift();
			if(new_direction != direction && new_direction != reserve_direction(direction)) {
				direction = new_direction;
				steps += 1;
				break;
			}	
		}
	}

	this.update_body = function(food_style) {
		switch(direction) {
			case "east": 
				temp_x = body_x[body_x.length - 1] + step_size;
				temp_y = body_y[body_y.length - 1];
				break;
			case "west":
				temp_x = body_x[body_x.length - 1] - step_size;
				temp_y = body_y[body_y.length - 1];
				break;
			case "south": 
				temp_x = body_x[body_x.length - 1];
				temp_y = body_y[body_y.length - 1] + step_size;
				break;
			case "north":
				temp_x = body_x[body_x.length - 1];
				temp_y = body_y[body_y.length - 1] - step_size;
				break;
		}
		temp_x = temp_x >= max_x ? 0 : temp_x < 0 ? max_x - 1 : temp_x;
		temp_y = temp_y >= max_y ? 0 : temp_y < 0 ? max_y - 1 : temp_y;
		switch(food_style) {
			case 1: 
				speed = speed == 1 ? 1 : speed - 1;
				break;
			case 2: 
			case 3: 
				speed = speed == 10 ? 10 : speed + 1;
				break;
			case -1: //'nothing':
				body_x.shift();
				body_y.shift();
				break ;
		}

		for(var i = 0; i < body_x.length - 4; ++i) {
			if(body_x[i] == temp_x && body_y[i] == temp_y) {
				alive = false;
				break;
			}
		}
		body_x.push(temp_x);
		body_y.push(temp_y);
	}

	this.draw_body = function (ctx) {
		ctx.fillStyle = color;
		for (var i = body_x.length; i >= 0; --i) {
			ctx.fillRect(body_x[i]*node_size, body_y[i]*node_size, node_size, node_size);
		}
	}

	this.get_header_info = function() {
		return {
			x: body_x[body_x.length - 1],
			y: body_y[body_y.length - 1],
			d: direction
		}
	}

	this.get_body = function () {
		return {
			x: body_x,
			y: body_y
		}
	}

	this.get_speed = function () {
		return speed;
	}
	this.get_length = function () {
		return body_x.length;
	}
	this.get_steps = function () {
		return steps;
	}

	this.is_death = function() {
		return !alive;
	}

}

function food () {
// 属性
	var pos_x = [5, 7, 8];
	var pos_y = [5, 7, 8];
	var attribute = [1, 2, 3];
	var food_color = ["#ff0000", "#0ff000", "#000fff"];
	var count = 3;
	var temp_x = 0;
	var temp_y = 0;

// 动作
	this.check_hit = function (body) {
		snake_x = body.x;
		snake_y = body.y;
		x = snake_x[snake_x.length - 1];
		y = snake_y[snake_y.length - 1];
		for(var i = 0; i < count; ++i) {
			// 如果吃到食物
			if(pos_x[i] == x && pos_y[i] == y) {
				// 随机生成食物坐标
				temp_x = Math.floor(Math.random() * (max_x - 1));
				temp_y = Math.floor(Math.random() * (max_y - 1));
				for(var j = 0; j < 4; ++j) {
					if((temp_x == snake_x[snake_x.length - j - 1] && temp_y == snake_y[snake_y.length - j - 1]) ||
							(pos_x[j] == temp_x && pos_y[j] == temp_y)) {
						temp_x = Math.floor(Math.random() * (max_x - 1));
						temp_y = Math.floor(Math.random() * (max_y - 1));
						j = -1;
					}
				}
				pos_x[i] = temp_x;
				pos_y[i] = temp_y;
				return attribute[i];
			}
		}
		return -1;
	}

	this.draw_food = function (ctx) {
		for (var i = 0; i < count; ++i) {
			ctx.fillStyle = food_color[i];
			ctx.fillRect(pos_x[i]*node_size, pos_y[i]*node_size, node_size, node_size);
		}
	}
}

function game() {
	var canvas = document.getElementById('main_canvas');
	var canvas_rect = canvas.getBoundingClientRect();
	var canvas_width = canvas_rect.width;
	var canvas_height = canvas_rect.height;
	var canvas_context = canvas.getContext('2d');
	var Tom = new snake('Tom', '#ff0000', 3, 'east');
	var Mr_food = new food();
	var command_queue = ['east'];
	var draw_frame_interval = 100;
	var update_data_interval = 100;
	var interval_id_update = -1;
	var interval_id_draw = -1;
	var temp_1 = 0;
	var temp_2 = 0;
	var temp_pos;
	var relative_x = 0;
	var relative_y = 0;

	var data_x = [0, 0, 0, 0, 0,0,0,0,0,0,0];
	var data_y = [0, 0, 0, 0, 0,0,0,0,0,0,0];
	var step = 0;
	var radian = 0;
	var radius = 20;
	var center_x = 150;
	var center_y = 200;
	var PI = Math.PI;
	var red = 22;
	var green = 99;
	var blue = 50;

	function restart () {
		Tom = undefined;
		Tom = new snake('Tom', "#897544", 3, 'east');
		play();
	}
	function rgba(r, g, b, a) {
		return 'rgba(' + r + ',' + g +',' + b +',' + a + ')';
	}
	var status;
	function draw_status() {
		status = 'speed:'+Tom.get_speed()+'  length:'+Tom.get_length()+'  steps:'+Tom.get_steps();
		canvas_context.fillStyle = rgba(55, 39, 24, 0.4);
		canvas_context.font = '10px consolas';
		canvas_context.fillText(status ,
			(canvas_width - canvas_context.measureText(status).width)/2, 20);
	}

	var text_style = ['12px serif', '20px sans-serif', '30px serif'];
	function draw_message(message, y, type, times) {
		canvas_context.fillStyle = rgba(22, 14, 77, Math.abs(0-times)/45 * 0.8);
		canvas_context.font = text_style[type];
		canvas_context.fillText(message, (canvas_width - canvas_context.measureText(message).width)/2, y);
	}
	var draw_message_times = 50;
	var message_text = "Snake v4.3 TOUCH";
	var message_type = 2;
	var message_y_pos = 0;

	function check_achievement(){
		if(Tom.get_length() == 2) {
			message_type = 1;
			draw_message_times = 100;
			message_text = "获得成就：first blood！";
			message_y_pos = 290;
		}
		if(Tom.get_steps() == 50) {
			message_type = 1;
			draw_message_times = 100;
			message_text = "获得成就：初入江湖";
			message_y_pos = 290;
		}
	}
	function update_data () {
		Tom.change_direction(command_queue);
		Tom.update_body(Mr_food.check_hit(Tom.get_body()));
		canvas_context.clearRect(0, 0, canvas_width, canvas_height);
		Mr_food.draw_food(canvas_context);
		Tom.draw_body(canvas_context);
		check_achievement();
		draw_status();
		if(Tom.is_death())
			game_over();
		draw_message(message_text, message_y_pos, message_type, draw_message_times);
		draw_message_times = draw_message_times > 0 ? draw_message_times - 2 : 0;
	}

	function play() {
		clearInterval(interval_id_welcome);
		interval_id_update   = setInterval(update_data, update_data_interval);
	}

//////////////////////////////////////////////////////

	function welcome_text(ctx, message, y, style, color) {
		ctx.fillStyle = color;
		ctx.font = style;
		ctx.fillText(message, (300 - ctx.measureText(message).width)/2, y);
	}

	function draw_welcome() {
		var ctx = document.getElementById('main_canvas').getContext('2d');
		ctx.fillStyle = "#ff0000";
		ctx.clearRect(0, 0, 300, 300);

		if(radian < PI/2)
			step += PI/600;
		else if(radian < PI)
			step -= PI/600;
		else if(radian <= 3*PI/2)
			step += PI/600;
		else if(radian < 2*PI)
			step -= PI/600;
		if(radian >= 2*PI ) {
			radian = 0;
			red = Math.floor(Math.random() * 150) + 60;
			green = Math.floor(Math.random() * 150) + 60;
			blue = Math.floor(Math.random() * 150) + 60;
		}

		radian = radian + step;
		data_x[0] = radius * Math.cos(radian) * 2;
		data_y[0] = radius * Math.sin(radian);


		for(var i = data_x.length - 1; i >= 0; --i)
		{
			ctx.fillStyle = rgba(red, green, blue, 1-(i/data_x.length));
			ctx.beginPath();
			ctx.arc(center_x+data_x[i], center_y+data_y[i], 2, 0, 2*PI);
			ctx.closePath();
			ctx.fill();
			data_x[i] = data_x[i>0 ? i - 1 : 0];
			data_y[i] = data_y[i>0 ? i - 1 : 0];
		}
		welcome_text(ctx, "Snake V4.3 - touch", 80, "25px Serif bold", rgba(9, 25, 99, 0.8));
		welcome_text(ctx, "Click your mid-mouse-button or", 110, "italic 12px consolas", rgba(99, 99, 129, 0.8));
		welcome_text(ctx, "Tap me with two fingers", 125, "italic 12px consolas", rgba(99, 99, 129, 0.8));
		welcome_text(ctx, "Thanks for your interest!", 150, "italic 15px consolas", rgba(189, 6, 129, 0.8));
	}

//////////////////////////////////////////////////


	function pause() {
		if(interval_id_update == -2)
			play();
		else if(interval_id_update != -1)
		{
			clearInterval(interval_id_update);
			interval_id_update = -2;
			draw_message("---PAUSE---", canvas_height/2, 1, 100);
		}
	}

	function game_over () {
		clearInterval(interval_id_update);
		interval_id_update = -1;
		draw_message("---GAME OVER---", canvas_height/2, 1, 100);
	}

	function get_touch_pos(event) {
		return {
			x: event.touches[0].pageX - canvas_rect.left, 
			y: event.touches[0].pageY - canvas_rect.top,
			p: (event.touches[1].pageX > 0) 	// 两点识别
		};
	}

	function get_click_pos(event) {
		return {
			x: event.clientX - canvas_rect.left, 
			y: event.clientY - canvas_rect.top,
			p: (event.button == 1)		// 识别中键
		}
	}

	function convert_event(event) {
		if(event.type == 'click')
			temp_pos = get_click_pos(event);
		else 
			temp_pos = get_touch_pos(event);
		if(temp_pos.p)	{		// 暂停信号
			if(interval_id_update == -2 ) play();
			else if (Tom.is_death()) restart();
			else  pause();
			return ;
		}
		if(interval_id_update == -2)	// 暂停状态，不处理事件
			return ;
		snake_header_info = Tom.get_header_info();
		relative_x = Math.floor(temp_pos.x/10) - snake_header_info.x;
		relative_y = snake_header_info.y - Math.floor(temp_pos.y/10);

		if(snake_header_info.d == 'east' || snake_header_info.d == 'west') {
			temp_1 = relative_x + 2*relative_y;
			temp_2 = relative_x - 2*relative_y;
			if(temp_1 >= 0 && temp_2 <= 0) 
				command_queue.push('north');
			else if(temp_1 <= 0 && temp_2 >= 0)
				command_queue.push('south');
			else if(temp_1 < 0 && temp_2 < 0) {
				if(snake_header_info.d == 'east') {
					if(relative_y > 0) {
						command_queue.push('north');
						command_queue.push('west');
					}
					else if(relative_y < 0) {
						command_queue.push('south');
						command_queue.push('west');
					}
				}
			} else if(temp_1 > 0 && temp_2 > 0) {
				if(snake_header_info.d == 'west') {
					if(relative_y > 0) {
						command_queue.push('north');
						command_queue.push('east');
					} else if(relative_y < 0) {
						command_queue.push('south');
						command_queue.push('east');
					}
				}
			}
		} else {
			temp_1 = 2*relative_x - relative_y;
			temp_2 = 2*relative_x + relative_y;
			if(temp_1 >= 0 && temp_2 >= 0) 
				command_queue.push('east');
			else if(temp_1 <= 0 && temp_2 <= 0)
				command_queue.push('west');
			else if(temp_1 < 0 && temp_2 > 0) {
				if(snake_header_info.d == 'south') {
					if(relative_x > 0) {
						command_queue.push('east');
						command_queue.push('north');
					} else if(relative_x < 0) {
						command_queue.push('west');
						command_queue.push('north');
					}
				}
			} else if(temp_1 > 0 && temp_2 < 0) {
				if(snake_header_info.d == 'north') {
					if(relative_x > 0) {
						command_queue.push('east');
						command_queue.push('south')
					} else if(relative_x < 0) {
						command_queue.push('west');
						command_queue.push('south');
					}
				}
			}
		}
	}
	canvas.addEventListener('touchstart', 	function (event){ convert_event(event)}, false);
	canvas.addEventListener('click', 		function (event){ convert_event(event)}, false);
	// play();
	interval_id_welcome = setInterval(draw_welcome, 40);
	interval_id_update = -2;
}
