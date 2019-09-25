Math.__name__ = true;
var _$Test_Vec3_$Impl_$ = {};
_$Test_Vec3_$Impl_$.__name__ = true;
_$Test_Vec3_$Impl_$._new = function(x,y,z) {
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var this1;
	var this2 = new Array(3);
	this1 = this2;
	this1[0] = x;
	this1[1] = y;
	this1[2] = z;
	return this1;
};
_$Test_Vec3_$Impl_$.get = function(this1,k) {
	return this1[k];
};
_$Test_Vec3_$Impl_$.set = function(this1,k,v) {
	this1[k] = v;
};
_$Test_Vec3_$Impl_$.add = function(this1,b) {
	return _$Test_Vec3_$Impl_$._new(this1[0] + b[0],this1[1] + b[1],this1[2] + b[2]);
};
_$Test_Vec3_$Impl_$.sub = function(this1,b) {
	return _$Test_Vec3_$Impl_$._new(this1[0] - b[0],this1[1] - b[1],this1[2] - b[2]);
};
_$Test_Vec3_$Impl_$.div = function(this1,b) {
	return _$Test_Vec3_$Impl_$._new(this1[0] / b[0],this1[1] / b[1],this1[2] / b[2]);
};
_$Test_Vec3_$Impl_$.mul = function(this1,b) {
	return _$Test_Vec3_$Impl_$._new(this1[0] * b[0],this1[1] * b[1],this1[2] * b[2]);
};
_$Test_Vec3_$Impl_$.scale = function(this1,b) {
	return _$Test_Vec3_$Impl_$._new(this1[0] * b,this1[1] * b,this1[2] * b);
};
_$Test_Vec3_$Impl_$.$length = function(this1) {
	return Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1] + this1[2] * this1[2]);
};
_$Test_Vec3_$Impl_$.lengthsq = function(this1) {
	return this1[0] * this1[0] + this1[1] * this1[1] + this1[2] * this1[2];
};
_$Test_Vec3_$Impl_$.normalize = function(this1) {
	var l = this1[0] * this1[0] + this1[1] * this1[1] + this1[2] * this1[2];
	if(l == 0) {
		return;
	}
	l = Math.sqrt(l);
	var _g = this1;
	_g[0] = _g[0] / l;
	var _g1 = this1;
	_g1[1] = _g1[1] / l;
	var _g2 = this1;
	_g2[2] = _g2[2] / l;
};
_$Test_Vec3_$Impl_$.cross = function(a,b) {
	return _$Test_Vec3_$Impl_$._new(a[1] * b[2] - a[2] * b[1],a[2] * b[0] - a[0] * b[2],a[0] * b[1] - a[1] * b[0]);
};
_$Test_Vec3_$Impl_$.trim = function(this1,max_len) {
	var len = Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1] + this1[2] * this1[2]);
	if(len > max_len) {
		var _g = this1;
		_g[0] = _g[0] / len;
		var _g1 = this1;
		_g1[1] = _g1[1] / len;
		var _g2 = this1;
		_g2[2] = _g2[2] / len;
		var _g3 = this1;
		_g3[0] = _g3[0] * max_len;
		var _g4 = this1;
		_g4[1] = _g4[1] * max_len;
		var _g5 = this1;
		_g5[2] = _g5[2] * max_len;
	}
};
_$Test_Vec3_$Impl_$.dot = function(a,b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
_$Test_Vec3_$Impl_$.copy = function(this1) {
	return _$Test_Vec3_$Impl_$._new(this1[0],this1[1],this1[2]);
};
var _$Test_Vec4_$Impl_$ = {};
_$Test_Vec4_$Impl_$.__name__ = true;
_$Test_Vec4_$Impl_$._new = function(a,b,c,d) {
	var this1;
	var this2 = new Array(4);
	this1 = this2;
	this1[0] = a;
	this1[1] = b;
	this1[2] = c;
	this1[3] = d;
	return this1;
};
_$Test_Vec4_$Impl_$.get = function(this1,k) {
	return this1[k];
};
var Plane = function(a,b) {
	this.origin = a;
	this.normal = b;
	this.equation = _$Test_Vec4_$Impl_$._new(b[0],b[1],b[2],-(b[0] * a[0] + b[1] * a[1] + b[2] * a[2]));
};
Plane.__name__ = true;
Plane.from_triangle = function(a,b,c) {
	var ba = _$Test_Vec3_$Impl_$._new(b[0] - a[0],b[1] - a[1],b[2] - a[2]);
	var ca = _$Test_Vec3_$Impl_$._new(c[0] - a[0],c[1] - a[1],c[2] - a[2]);
	var temp = _$Test_Vec3_$Impl_$._new(ba[1] * ca[2] - ba[2] * ca[1],ba[2] * ca[0] - ba[0] * ca[2],ba[0] * ca[1] - ba[1] * ca[0]);
	var l = temp[0] * temp[0] + temp[1] * temp[1] + temp[2] * temp[2];
	if(l != 0) {
		l = Math.sqrt(l);
		var _g = temp;
		_g[0] = _g[0] / l;
		var _g1 = temp;
		_g1[1] = _g1[1] / l;
		var _g2 = temp;
		_g2[2] = _g2[2] / l;
	}
	return new Plane(a,temp);
};
Plane.prototype = {
	signed_distance: function(base_point) {
		var b = this.normal;
		var a = this.normal;
		var b1 = this.origin;
		return base_point[0] * b[0] + base_point[1] * b[1] + base_point[2] * b[2] - (a[0] * b1[0] + a[1] * b1[1] + a[2] * b1[2]);
	}
	,is_front_facing: function(direction) {
		var a = this.normal;
		var f = a[0] * direction[0] + a[1] * direction[1] + a[2] * direction[2];
		if(f <= 0.0) {
			return true;
		}
		return false;
	}
};
var Collision = function() { };
Collision.__name__ = true;
Collision.triangle_intersects_point = function(point,v0,v1,v2) {
	var u = _$Test_Vec3_$Impl_$._new(v1[0] - v0[0],v1[1] - v0[1],v1[2] - v0[2]);
	var v = _$Test_Vec3_$Impl_$._new(v2[0] - v0[0],v2[1] - v0[1],v2[2] - v0[2]);
	var w = _$Test_Vec3_$Impl_$._new(point[0] - v0[0],point[1] - v0[1],point[2] - v0[2]);
	var vw = _$Test_Vec3_$Impl_$._new(v[1] * w[2] - v[2] * w[1],v[2] * w[0] - v[0] * w[2],v[0] * w[1] - v[1] * w[0]);
	var vu = _$Test_Vec3_$Impl_$._new(v[1] * u[2] - v[2] * u[1],v[2] * u[0] - v[0] * u[2],v[0] * u[1] - v[1] * u[0]);
	if(vw[0] * vu[0] + vw[1] * vu[1] + vw[2] * vu[2] < 0.0) {
		return false;
	}
	var uw = _$Test_Vec3_$Impl_$._new(u[1] * w[2] - u[2] * w[1],u[2] * w[0] - u[0] * w[2],u[0] * w[1] - u[1] * w[0]);
	var uv = _$Test_Vec3_$Impl_$._new(u[1] * v[2] - u[2] * v[1],u[2] * v[0] - u[0] * v[2],u[0] * v[1] - u[1] * v[0]);
	if(uw[0] * uv[0] + uw[1] * uv[1] + uw[2] * uv[2] < 0.0) {
		return false;
	}
	var d = Math.sqrt(uv[0] * uv[0] + uv[1] * uv[1] + uv[2] * uv[2]);
	var r = Math.sqrt(vw[0] * vw[0] + vw[1] * vw[1] + vw[2] * vw[2]) / d;
	var t = Math.sqrt(uw[0] * uw[0] + uw[1] * uw[1] + uw[2] * uw[2]) / d;
	return r + t <= 1;
};
Collision.get_lowest_root = function(a,b,c,max) {
	var determinant = b * b - 4.0 * a * c;
	if(determinant < 0.0) {
		return null;
	}
	var sqrtD = Math.sqrt(determinant);
	var r1 = (-b - sqrtD) / (2 * a);
	var r2 = (-b + sqrtD) / (2 * a);
	if(r1 > r2) {
		var temp = r2;
		r2 = r1;
		r1 = temp;
	}
	if(r1 > 0 && r1 < max) {
		return r1;
	}
	if(r2 > 0 && r2 < max) {
		return r2;
	}
	return null;
};
Collision.check_triangle = function(packet,p1,p2,p3) {
	var plane = Plane.from_triangle(p1,p2,p3);
	if(!plane.is_front_facing(packet.e_norm_velocity)) {
		return packet;
	}
	var t0 = 0.0;
	var t1 = 0.0;
	var embedded_in_plane = false;
	var signed_dist_to_plane = plane.signed_distance(packet.e_base_point);
	var a = plane.normal;
	var b = packet.e_velocity;
	var normal_dot_vel = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	if(normal_dot_vel == 0.0) {
		if(Math.abs(signed_dist_to_plane) >= 1.0) {
			return packet;
		} else {
			embedded_in_plane = true;
			t0 = 0.0;
			t1 = 1.0;
		}
	} else {
		t0 = (-1.0 - signed_dist_to_plane) / normal_dot_vel;
		t1 = (1.0 - signed_dist_to_plane) / normal_dot_vel;
		if(t0 > t1) {
			var temp = t1;
			t1 = t0;
			t0 = temp;
		}
		if(t0 > 1.0 || t1 < 0.0) {
			return packet;
		}
		if(t0 < 0.0) {
			t0 = 0.0;
		}
		if(t1 < 0.0) {
			t1 = 0.0;
		}
		if(t0 > 1.0) {
			t0 = 1.0;
		}
		if(t1 > 1.0) {
			t1 = 1.0;
		}
	}
	var collision_point = _$Test_Vec3_$Impl_$._new(0.0,0.0,0.0);
	var found_collision = false;
	var t = 1.0;
	if(!embedded_in_plane) {
		var this1 = packet.e_base_point;
		var b1 = plane.normal;
		var plane_intersect = _$Test_Vec3_$Impl_$._new(this1[0] - b1[0],this1[1] - b1[1],this1[2] - b1[2]);
		var this2 = packet.e_velocity;
		var temp1 = _$Test_Vec3_$Impl_$._new(this2[0] * t0,this2[1] * t0,this2[2] * t0);
		plane_intersect = _$Test_Vec3_$Impl_$._new(plane_intersect[0] + temp1[0],plane_intersect[1] + temp1[1],plane_intersect[2] + temp1[2]);
		if(Collision.triangle_intersects_point(plane_intersect,p1,p2,p3)) {
			found_collision = true;
			t = t0;
			collision_point = plane_intersect;
		}
	}
	if(!found_collision) {
		var velocity = _$Test_Vec3_$Impl_$.copy(packet.e_velocity);
		var base = _$Test_Vec3_$Impl_$.copy(packet.e_base_point);
		var velocity_sq_length = velocity[0] * velocity[0] + velocity[1] * velocity[1] + velocity[2] * velocity[2];
		var a1 = velocity_sq_length;
		var b2 = 0.0;
		var c = 0.0;
		var temp2 = _$Test_Vec3_$Impl_$._new(base[0] - p1[0],base[1] - p1[1],base[2] - p1[2]);
		b2 = 2.0 * (velocity[0] * temp2[0] + velocity[1] * temp2[1] + velocity[2] * temp2[2]);
		temp2 = _$Test_Vec3_$Impl_$._new(p1[0] - base[0],p1[1] - base[1],p1[2] - base[2]);
		c = temp2[0] * temp2[0] + temp2[1] * temp2[1] + temp2[2] * temp2[2] - 1.0;
		var new_t = Collision.get_lowest_root(a1,b2,c,t);
		if(new_t != null) {
			t = new_t;
			found_collision = true;
			collision_point = p1;
		}
		if(!found_collision) {
			temp2 = _$Test_Vec3_$Impl_$._new(base[0] - p2[0],base[1] - p2[1],base[2] - p2[2]);
			b2 = 2.0 * (velocity[0] * temp2[0] + velocity[1] * temp2[1] + velocity[2] * temp2[2]);
			temp2 = _$Test_Vec3_$Impl_$._new(p2[0] - base[0],p2[1] - base[1],p2[2] - base[2]);
			c = temp2[0] * temp2[0] + temp2[1] * temp2[1] + temp2[2] * temp2[2] - 1.0;
			new_t = Collision.get_lowest_root(a1,b2,c,t);
			if(new_t != null) {
				t = new_t;
				found_collision = true;
				collision_point = p2;
			}
		}
		if(!found_collision) {
			temp2 = _$Test_Vec3_$Impl_$._new(base[0] - p3[0],base[1] - p3[1],base[2] - p3[2]);
			b2 = 2.0 * (velocity[0] * temp2[0] + velocity[1] * temp2[1] + velocity[2] * temp2[2]);
			temp2 = _$Test_Vec3_$Impl_$._new(p3[0] - base[0],p3[1] - base[1],p3[2] - base[2]);
			c = temp2[0] * temp2[0] + temp2[1] * temp2[1] + temp2[2] * temp2[2] - 1.0;
			new_t = Collision.get_lowest_root(a1,b2,c,t);
			if(new_t != null) {
				t = new_t;
				found_collision = true;
				collision_point = p3;
			}
		}
		var edge = _$Test_Vec3_$Impl_$._new(p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]);
		var base_to_vertex = _$Test_Vec3_$Impl_$._new(p1[0] - base[0],p1[1] - base[1],p1[2] - base[2]);
		var edge_sq_length = edge[0] * edge[0] + edge[1] * edge[1] + edge[2] * edge[2];
		var edge_dot_velocity = edge[0] * velocity[0] + edge[1] * velocity[1] + edge[2] * velocity[2];
		var edge_dot_base_to_vertex = edge[0] * base_to_vertex[0] + edge[1] * base_to_vertex[1] + edge[2] * base_to_vertex[2];
		a1 = edge_sq_length * -velocity_sq_length + edge_dot_velocity * edge_dot_velocity;
		b2 = edge_sq_length * (2.0 * (velocity[0] * base_to_vertex[0] + velocity[1] * base_to_vertex[1] + velocity[2] * base_to_vertex[2])) - 2.0 * edge_dot_velocity * edge_dot_base_to_vertex;
		c = edge_sq_length * (1.0 - (base_to_vertex[0] * base_to_vertex[0] + base_to_vertex[1] * base_to_vertex[1] + base_to_vertex[2] * base_to_vertex[2])) + edge_dot_base_to_vertex * edge_dot_base_to_vertex;
		new_t = Collision.get_lowest_root(a1,b2,c,t);
		if(new_t != null) {
			var f = (edge_dot_velocity * new_t - edge_dot_base_to_vertex) / edge_sq_length;
			if(f >= 0.0 && f <= 1.0) {
				t = new_t;
				found_collision = true;
				var b3 = _$Test_Vec3_$Impl_$._new(edge[0] * f,edge[1] * f,edge[2] * f);
				collision_point = _$Test_Vec3_$Impl_$._new(p1[0] + b3[0],p1[1] + b3[1],p1[2] + b3[2]);
			}
		}
		edge = _$Test_Vec3_$Impl_$._new(p3[0] - p2[0],p3[1] - p2[1],p3[2] - p2[2]);
		base_to_vertex = _$Test_Vec3_$Impl_$._new(p2[0] - base[0],p2[1] - base[1],p2[2] - base[2]);
		edge_sq_length = edge[0] * edge[0] + edge[1] * edge[1] + edge[2] * edge[2];
		edge_dot_velocity = edge[0] * velocity[0] + edge[1] * velocity[1] + edge[2] * velocity[2];
		edge_dot_base_to_vertex = edge[0] * base_to_vertex[0] + edge[1] * base_to_vertex[1] + edge[2] * base_to_vertex[2];
		a1 = edge_sq_length * -velocity_sq_length + edge_dot_velocity * edge_dot_velocity;
		b2 = edge_sq_length * (2.0 * (velocity[0] * base_to_vertex[0] + velocity[1] * base_to_vertex[1] + velocity[2] * base_to_vertex[2])) - 2.0 * edge_dot_velocity * edge_dot_base_to_vertex;
		c = edge_sq_length * (1.0 - (base_to_vertex[0] * base_to_vertex[0] + base_to_vertex[1] * base_to_vertex[1] + base_to_vertex[2] * base_to_vertex[2])) + edge_dot_base_to_vertex * edge_dot_base_to_vertex;
		new_t = Collision.get_lowest_root(a1,b2,c,t);
		if(new_t != null) {
			var f1 = (edge_dot_velocity * new_t - edge_dot_base_to_vertex) / edge_sq_length;
			if(f1 >= 0.0 && f1 <= 1.0) {
				t = new_t;
				found_collision = true;
				var b4 = _$Test_Vec3_$Impl_$._new(edge[0] * f1,edge[1] * f1,edge[2] * f1);
				collision_point = _$Test_Vec3_$Impl_$._new(p2[0] + b4[0],p2[1] + b4[1],p2[2] + b4[2]);
			}
		}
		edge = _$Test_Vec3_$Impl_$._new(p1[0] - p3[0],p1[1] - p3[1],p1[2] - p3[2]);
		base_to_vertex = _$Test_Vec3_$Impl_$._new(p3[0] - base[0],p3[1] - base[1],p3[2] - base[2]);
		edge_sq_length = edge[0] * edge[0] + edge[1] * edge[1] + edge[2] * edge[2];
		edge_dot_velocity = edge[0] * velocity[0] + edge[1] * velocity[1] + edge[2] * velocity[2];
		edge_dot_base_to_vertex = edge[0] * base_to_vertex[0] + edge[1] * base_to_vertex[1] + edge[2] * base_to_vertex[2];
		a1 = edge_sq_length * -velocity_sq_length + edge_dot_velocity * edge_dot_velocity;
		b2 = edge_sq_length * (2.0 * (velocity[0] * base_to_vertex[0] + velocity[1] * base_to_vertex[1] + velocity[2] * base_to_vertex[2])) - 2.0 * edge_dot_velocity * edge_dot_base_to_vertex;
		c = edge_sq_length * (1.0 - (base_to_vertex[0] * base_to_vertex[0] + base_to_vertex[1] * base_to_vertex[1] + base_to_vertex[2] * base_to_vertex[2])) + edge_dot_base_to_vertex * edge_dot_base_to_vertex;
		new_t = Collision.get_lowest_root(a1,b2,c,t);
		if(new_t != null) {
			var f2 = (edge_dot_velocity * new_t - edge_dot_base_to_vertex) / edge_sq_length;
			if(f2 >= 0.0 && f2 <= 1.0) {
				t = new_t;
				found_collision = true;
				var b5 = _$Test_Vec3_$Impl_$._new(edge[0] * f2,edge[1] * f2,edge[2] * f2);
				collision_point = _$Test_Vec3_$Impl_$._new(p3[0] + b5[0],p3[1] + b5[1],p3[2] + b5[2]);
			}
		}
	}
	if(found_collision) {
		var this3 = packet.e_velocity;
		var dist_to_coll = t * Math.sqrt(this3[0] * this3[0] + this3[1] * this3[1] + this3[2] * this3[2]);
		if(!packet.found_collision || dist_to_coll < packet.nearest_distance) {
			packet.nearest_distance = dist_to_coll;
			packet.intersect_point = collision_point;
			packet.found_collision = true;
		}
		var b6 = packet.e_base_point;
		var n = _$Test_Vec3_$Impl_$._new(collision_point[0] - b6[0],collision_point[1] - b6[1],collision_point[2] - b6[2]);
		var l = n[0] * n[0] + n[1] * n[1] + n[2] * n[2];
		if(l != 0) {
			l = Math.sqrt(l);
			var _g = n;
			_g[0] = _g[0] / l;
			var _g1 = n;
			_g1[1] = _g1[1] / l;
			var _g2 = n;
			_g2[2] = _g2[2] / l;
		}
		var b7 = _$Test_Vec3_$Impl_$._new(0,1,0);
		var dz = n[0] * b7[0] + n[1] * b7[1] + n[2] * b7[2];
		if(dz <= -0.5) {
			packet.grounded = true;
		}
	}
	return packet;
};
var CollisionPacket = function(position,velocity,radius) {
	this.grounded = false;
	this.intersect_point = _$Test_Vec3_$Impl_$._new(0.0,0.0,0.0);
	this.e_base_point = _$Test_Vec3_$Impl_$._new(0.0,0.0,0.0);
	this.e_norm_velocity = _$Test_Vec3_$Impl_$._new(0.0,0.0,0.0);
	this.depth = 0;
	this.nearest_distance = CollisionPacket.LARGE_NUMBER;
	this.found_collision = false;
	this.e_velocity = _$Test_Vec3_$Impl_$._new(0.0,0.0,0.0);
	this.e_position = _$Test_Vec3_$Impl_$._new(0.0,0.0,0.0);
	this.e_radius = _$Test_Vec3_$Impl_$._new(1.0,1.0,1.0);
	this.r3_velocity = _$Test_Vec3_$Impl_$._new(0.0,0.0,0.0);
	this.r3_position = _$Test_Vec3_$Impl_$._new(0.0,0.0,0.0);
	if(position != null) {
		this.r3_position = position;
	}
	if(velocity != null) {
		this.r3_velocity = velocity;
	}
	if(radius != null) {
		this.e_radius = radius;
	}
	var this1 = this.r3_position;
	var b = this.e_radius;
	this.e_position = _$Test_Vec3_$Impl_$._new(this1[0] / b[0],this1[1] / b[1],this1[2] / b[2]);
	var this2 = this.r3_velocity;
	var b1 = this.e_radius;
	this.e_velocity = _$Test_Vec3_$Impl_$._new(this2[0] / b1[0],this2[1] / b1[1],this2[2] / b1[2]);
};
CollisionPacket.__name__ = true;
CollisionPacket.prototype = {
	to_e: function() {
		var this1 = this.r3_position;
		var b = this.e_radius;
		this.e_position = _$Test_Vec3_$Impl_$._new(this1[0] / b[0],this1[1] / b[1],this1[2] / b[2]);
		var this2 = this.r3_velocity;
		var b1 = this.e_radius;
		this.e_velocity = _$Test_Vec3_$Impl_$._new(this2[0] / b1[0],this2[1] / b1[1],this2[2] / b1[2]);
	}
	,to_r3: function() {
		var this1 = this.e_position;
		var b = this.e_radius;
		this.r3_position = _$Test_Vec3_$Impl_$._new(this1[0] * b[0],this1[1] * b[1],this1[2] * b[2]);
		var this2 = this.e_velocity;
		var b1 = this.e_radius;
		this.r3_velocity = _$Test_Vec3_$Impl_$._new(this2[0] * b1[0],this2[1] * b1[1],this2[2] * b1[2]);
	}
};
var _$Test_Triangle_$Impl_$ = {};
_$Test_Triangle_$Impl_$.__name__ = true;
_$Test_Triangle_$Impl_$._new = function(v0,v1,v2) {
	var this1 = [v0,v1,v2];
	return this1;
};
_$Test_Triangle_$Impl_$.get = function(this1,k) {
	return this1[k];
};
var Response = function(fn) {
	this.get_triangles = fn;
};
Response.__name__ = true;
Response.prototype = {
	collide_with_world: function(packet,e_position,e_velocity,slide_threshold) {
		var unit_scale = Response.UNITS_PER_METER / 100.0;
		var very_close_dist = 0.005 * unit_scale;
		if(packet.depth > 5) {
			return e_position;
		}
		packet.e_velocity = e_velocity;
		packet.e_norm_velocity = _$Test_Vec3_$Impl_$.copy(e_velocity);
		var this1 = packet.e_norm_velocity;
		var l = this1[0] * this1[0] + this1[1] * this1[1] + this1[2] * this1[2];
		if(l != 0) {
			l = Math.sqrt(l);
			var _g = this1;
			_g[0] = _g[0] / l;
			var _g1 = this1;
			_g1[1] = _g1[1] / l;
			var _g2 = this1;
			_g2[2] = _g2[2] / l;
		}
		packet.e_base_point = e_position;
		packet.found_collision = false;
		packet.nearest_distance = 1e20;
		var scale = Math.max(1.5,Math.sqrt(e_velocity[0] * e_velocity[0] + e_velocity[1] * e_velocity[1] + e_velocity[2] * e_velocity[2])) * 1.1;
		var b = packet.e_radius;
		var r3_position = _$Test_Vec3_$Impl_$._new(e_position[0] * b[0],e_position[1] * b[1],e_position[2] * b[2]);
		var this2 = packet.e_radius;
		var query_radius = _$Test_Vec3_$Impl_$._new(this2[0] * scale,this2[1] * scale,this2[2] * scale);
		var min = _$Test_Vec3_$Impl_$._new(r3_position[0] - query_radius[0],r3_position[1] - query_radius[1],r3_position[2] - query_radius[2]);
		var max = _$Test_Vec3_$Impl_$._new(r3_position[0] + query_radius[0],r3_position[1] + query_radius[1],r3_position[2] + query_radius[2]);
		var tris = this.get_triangles(min,max);
		var _g3 = 0;
		while(_g3 < tris.length) {
			var tri = tris[_g3];
			++_g3;
			var this3 = tri[0];
			var b1 = packet.e_radius;
			var tmp = _$Test_Vec3_$Impl_$._new(this3[0] / b1[0],this3[1] / b1[1],this3[2] / b1[2]);
			var this4 = tri[1];
			var b2 = packet.e_radius;
			var tmp1 = _$Test_Vec3_$Impl_$._new(this4[0] / b2[0],this4[1] / b2[1],this4[2] / b2[2]);
			var this5 = tri[2];
			var b3 = packet.e_radius;
			Collision.check_triangle(packet,tmp,tmp1,_$Test_Vec3_$Impl_$._new(this5[0] / b3[0],this5[1] / b3[1],this5[2] / b3[2]));
		}
		if(!packet.found_collision) {
			return _$Test_Vec3_$Impl_$._new(e_position[0] + e_velocity[0],e_position[1] + e_velocity[1],e_position[2] + e_velocity[2]);
		}
		var dest_point = _$Test_Vec3_$Impl_$._new(e_position[0] + e_velocity[0],e_position[1] + e_velocity[1],e_position[2] + e_velocity[2]);
		var new_base_point = e_position;
		if(packet.nearest_distance >= very_close_dist) {
			var v = _$Test_Vec3_$Impl_$.copy(e_velocity);
			var max_len = packet.nearest_distance - very_close_dist;
			var len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
			if(len > max_len) {
				var _g4 = v;
				_g4[0] = _g4[0] / len;
				var _g5 = v;
				_g5[1] = _g5[1] / len;
				var _g6 = v;
				_g6[2] = _g6[2] / len;
				var _g7 = v;
				_g7[0] = _g7[0] * max_len;
				var _g8 = v;
				_g8[1] = _g8[1] * max_len;
				var _g9 = v;
				_g9[2] = _g9[2] * max_len;
			}
			var this6 = packet.e_base_point;
			new_base_point = _$Test_Vec3_$Impl_$._new(this6[0] + v[0],this6[1] + v[1],this6[2] + v[2]);
			var l1 = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
			if(l1 != 0) {
				l1 = Math.sqrt(l1);
				var _g10 = v;
				_g10[0] = _g10[0] / l1;
				var _g11 = v;
				_g11[1] = _g11[1] / l1;
				var _g12 = v;
				_g12[2] = _g12[2] / l1;
			}
			var this7 = packet.intersect_point;
			var b4 = _$Test_Vec3_$Impl_$._new(v[0] * very_close_dist,v[1] * very_close_dist,v[2] * very_close_dist);
			packet.intersect_point = _$Test_Vec3_$Impl_$._new(this7[0] - b4[0],this7[1] - b4[1],this7[2] - b4[2]);
		}
		var slide_plane_origin = _$Test_Vec3_$Impl_$.copy(packet.intersect_point);
		var b5 = packet.intersect_point;
		var slide_plane_normal = _$Test_Vec3_$Impl_$._new(new_base_point[0] - b5[0],new_base_point[1] - b5[1],new_base_point[2] - b5[2]);
		var l2 = slide_plane_normal[0] * slide_plane_normal[0] + slide_plane_normal[1] * slide_plane_normal[1] + slide_plane_normal[2] * slide_plane_normal[2];
		if(l2 != 0) {
			l2 = Math.sqrt(l2);
			var _g13 = slide_plane_normal;
			_g13[0] = _g13[0] / l2;
			var _g14 = slide_plane_normal;
			_g14[1] = _g14[1] / l2;
			var _g15 = slide_plane_normal;
			_g15[2] = _g15[2] / l2;
		}
		var sliding_plane = new Plane(slide_plane_origin,slide_plane_normal);
		var slide_factor = sliding_plane.signed_distance(dest_point);
		if(packet.intersect_point[1] <= e_position[1] && sliding_plane.normal[1] > slide_threshold && e_velocity[1] < 0.0) {
			return new_base_point;
		}
		var b6 = _$Test_Vec3_$Impl_$._new(slide_plane_normal[0] * slide_factor,slide_plane_normal[1] * slide_factor,slide_plane_normal[2] * slide_factor);
		var new_dest_point = _$Test_Vec3_$Impl_$._new(dest_point[0] - b6[0],dest_point[1] - b6[1],dest_point[2] - b6[2]);
		var b7 = packet.intersect_point;
		var new_velocity = _$Test_Vec3_$Impl_$._new(new_dest_point[0] - b7[0],new_dest_point[1] - b7[1],new_dest_point[2] - b7[2]);
		if(Math.sqrt(new_velocity[0] * new_velocity[0] + new_velocity[1] * new_velocity[1] + new_velocity[2] * new_velocity[2]) < very_close_dist) {
			return new_base_point;
		}
		packet.depth += 1;
		return this.collide_with_world(packet,new_base_point,new_velocity,slide_threshold);
	}
	,collide_and_slide: function(packet,gravity) {
		var this1 = packet.r3_position;
		var b = packet.e_radius;
		var e_position = _$Test_Vec3_$Impl_$._new(this1[0] / b[0],this1[1] / b[1],this1[2] / b[2]);
		var this2 = packet.r3_velocity;
		var b1 = packet.e_radius;
		var e_velocity = _$Test_Vec3_$Impl_$._new(this2[0] / b1[0],this2[1] / b1[1],this2[2] / b1[2]);
		var final_position = _$Test_Vec3_$Impl_$._new();
		e_velocity[1] = Math.max(0.0,e_velocity[1]);
		var slide_threshold = 0.9;
		packet.depth = 0;
		final_position = this.collide_with_world(packet,e_position,e_velocity,slide_threshold);
		var b2 = packet.e_radius;
		packet.r3_position = _$Test_Vec3_$Impl_$._new(final_position[0] * b2[0],final_position[1] * b2[1],final_position[2] * b2[2]);
		packet.r3_velocity = _$Test_Vec3_$Impl_$.copy(gravity);
		var b3 = packet.e_radius;
		e_velocity = _$Test_Vec3_$Impl_$._new(gravity[0] / b3[0],gravity[1] / b3[1],gravity[2] / b3[2]);
		packet.depth = 0;
		final_position = this.collide_with_world(packet,final_position,e_velocity,slide_threshold);
		packet.r3_velocity = _$Test_Vec3_$Impl_$._new();
		var b4 = packet.e_radius;
		packet.r3_position = _$Test_Vec3_$Impl_$._new(final_position[0] * b4[0],final_position[1] * b4[1],final_position[2] * b4[2]);
	}
	,update: function(packet) {
		var gravity = _$Test_Vec3_$Impl_$._new(0,Math.min(packet.r3_velocity[1],0),0);
		this.collide_and_slide(packet,gravity);
	}
};
var Test = function() {
};
Test.__name__ = true;
Test.get_triangles = function(min,max) {
	var this1 = [_$Test_Vec3_$Impl_$._new(-5,-0.53,-5),_$Test_Vec3_$Impl_$._new(-5,-0.53,5),_$Test_Vec3_$Impl_$._new(5,-0.53,5)];
	return [this1];
};
Test.update = function() {
	var _g = Test.velocity;
	_g[1] = _g[1] - 0.01;
	var packet = new CollisionPacket(Test.position,Test.velocity,Test.radius);
	var response = new Response(Test.get_triangles);
	response.update(packet);
	Test.position = packet.r3_position;
	Test.velocity = packet.r3_velocity;
	haxe_Log.trace("pos",{ fileName : "Test.hx", lineNumber : 671, className : "Test", methodName : "update", customParams : [Test.position]});
	haxe_Log.trace("vel",{ fileName : "Test.hx", lineNumber : 672, className : "Test", methodName : "update", customParams : [Test.velocity]});
};
Test.main = function() {
	Test.update();
};
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	var tmp;
	if(typeof(document) != "undefined") {
		d = document.getElementById("haxe:trace");
		tmp = d != null;
	} else {
		tmp = false;
	}
	if(tmp) {
		d.innerHTML += js_Boot.__unhtml(msg) + "<br/>";
	} else if(typeof console != "undefined" && console.log != null) {
		console.log(msg);
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
String.__name__ = true;
Array.__name__ = true;
CollisionPacket.LARGE_NUMBER = 1e20;
Response.UNITS_PER_METER = 100.0;
Response.vmax = 0;
Test.position = _$Test_Vec3_$Impl_$._new(0,0,0);
Test.velocity = _$Test_Vec3_$Impl_$._new(0,-0.01,0);
Test.radius = _$Test_Vec3_$Impl_$._new(0.5,0.5,1.0);

const Vec3 = _$Test_Vec3_$Impl_$;

export { Response, CollisionPacket, Vec3 };