function ball () {
	var ctx;
	var color = "rgba(100, 190, 60, 0.7)";
	var life = 100;		// 生命时间
	var expandspeed = 9;
	var adx, ady, e;		// 横向加速度、纵向加速度、碰撞恢复系数
	this.mass;
	this.type = "small";
	this.v = {dx:0, dy:0};
	this.radius = 0;
	this.pos = {x:0, y:0};

	// 画布、初始x、初始y、半径、速度值、方向、颜色
	this.init = function (type, x, y, r, s, d, c, ax, ay, rv) {
		this.type = type;
		this.mass = 1;
		this.v.dx = s*Math.cos(d);
		this.v.dy = s*Math.sin(d);
		this.pos.x = x;
		this.pos.y = y;
		this.radius = r;
		adx = ax/400;
		ady = ax/400;
		e = 1 - rv/100;
		color = c == null ? color : c;
	}

	this.drawMyself = function (ctx) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius < 0 ? 0 : this.radius, 0, 2*Math.PI, true);
		ctx.fill();
	}

	// 返回false代表下一轮刷新时这个球不再存在
	this.update = function (boundary) {
		if (this.type == "small") {
			// 根据boundary修改方向
			if ((this.pos.x <= boundary.left + this.radius && this.v.dx < 0) || 
				(this.pos.x >= boundary.right - this.radius && this.v.dx > 0)) {
				this.v.dx = -this.v.dx
			} else {
				this.v.dx += adx;
			}
			if ((this.pos.y <= boundary.top + this.radius && this.v.dy < 0) || 
				(this.pos.y >= boundary.bottom - this.radius && this.v.dy > 0)) {
				this.v.dy = -this.v.dy
			} else {
				this.v.dy += ady;
			}

			this.pos.x += this.v.dx;
			this.pos.y += this.v.dy;
			return true;
		} else {
			if (this.radius < 28 && life > 10)
				this.radius += 2;
			else if(life <= 10) {
				this.radius -= 3;
			}
			if (life-- > 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	this.checkCollision = function (other) {
		var dx = other.pos.x - this.pos.x;
		var dy = other.pos.y - this.pos.y;
		var minDistace = this.radius + other.radius;

		// 精确距离太大，不会碰撞
		if (other.radius <= 0 || dx*dx + dy*dy > minDistace*minDistace) {
			return ;
		}

		if (other.type == "big") {
			this.type = "big";
			return ;
		}

		var rmin = 1/Math.sqrt(dx*dx + dy*dy);
		var n = {x:rmin*dx, y:rmin*dy};			// 圆心连线方向单位向量(this指向other方向为正)
		// 法线上的相对速度
		var vrn = ((this.v.dx - other.v.dx) * n.x + (this.v.dy - other.v.dy) * n.y);
		if (vrn <= 0) {
			return ;		// 两个球在远离，所以即使接触也不会碰撞
		}

		// 法线方向的冲量
		var i = (-vrn * (1+e) * this.mass * other.mass)/(this.mass + other.mass);
		var idxdy = {x:i*n.x , y:i*n.y};		// 将法线方向冲量分解为x和y两个方向的冲量
		this.v.dx = this.v.dx + idxdy.x * this.mass;
		this.v.dy = this.v.dy + idxdy.y * this.mass;
		other.v.dx = other.v.dx - idxdy.x * other.mass ;
		other.v.dy = other.v.dy - idxdy.y * other.mass ;
		return true;
/* wrong way 分量计算方法有错误
		var vtn = {x:this.v.dx*n.x, y:this.v.dy*n.y};		// this在n方向上的分量
		var von = {x:other.v.dx*n.x, y:other.v.dy*n.y};	// other在n方向上的分量
		var vtk = {x:this.v.dx*k.x, y:this.v.dy*k.y};		// this在k方向上的分量
		var vok = {x:other.v.dx*k.x, y:other.v.dy*k.y};	// other在k方向上的分量
		// 在n方向上根据动量守恒和能量守恒：
		// 		vtn` = ((mt-mo)*vtn + 2*mo*von)/(mt + mo)
		//		von` = ((mo-mt)*von + 2*mt*vtn)/(mt + mo)
		// 在 mo==mt 的情况下：
		//		vtn` = von
		//		von` = vtn
		// 最终速度为k方向的速度和n方向的速度合成
		this.v.dx = von.x + vtk.x;	this.v.dy = von.y + vtk.y;
		other.v.dx = vtn.x + vok.x;	other.v.dy = vtn.y + vok.y;
*/
	}

	this.expand = function () {
		this.radius += expandspeed++;
		if (this.radius >= 2000)
			return false;
	}
}
