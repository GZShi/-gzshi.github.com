function is_prime(n)
{
	if(n == 1)
		return false;
	var i = 2;

	while(i <= Math.floor(Math.sqrt(n)))
	{
		if(n % i == 0)
			return false;
		i+=1;
	}
	return true;
}

function draw_block(ctx, pos_x, pos_y, width, number)
{
	if(is_prime(number))
		ctx.fillRect(pos_x * width, pos_y * width, width, width);
}

function draw_prime_spiral()
{
	var max = parseInt(document.getElementById("bar_max").value);
	var size = parseInt(document.getElementById("bar_size").value);
	var ctx = document.getElementById('my_canvas').getContext('2d');

	ctx.clearRect(0, 0, 1000, 600);

	max = Math.floor(max);
	max = max <= 0 ? 1 : max;
	max = max >= 2000 ? 2000 : max;
	size = Math.floor(size);
	size = size <= 0 ? 1 : size;
	size = size >= 100 ? 100 : size;

	var direction = [0];
	var x = Math.floor(1000/(2*size));
	var y = Math.floor(600/(2*size));
	var i = 0;
	var order = 1;

	ctx.fillStyle = "#ff0000";
	while(true)
	{
		draw_block(ctx, x, y, size, order++);
		if(direction.length < 100 && i < max)
		{
			for(var j = 0; j < Math.floor((i+1)/2); ++j)
				direction.push(i%4);
			++i;
		}
		if(direction.length <= 0)
			break;
		switch(direction.shift())
		{
		case 0:
			x = x + 1;
			break;
		case 1:
			y = y + 1;
			break;
		case 2:
			x = x - 1;
			break;
		case 3:
			y = y - 1;
			break;
		default:
			alert('Wrong');
			break;
		}
	}
}