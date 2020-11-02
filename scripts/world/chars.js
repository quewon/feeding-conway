//init
var char = document.getElementById("chars");
var char_context = char.getContext("2d");
char.width = bg.width;
char.height = bg.height;
char_context.imageSmoothingEnabled = false;

//chars
var chars = {};

function createChar(name) {
	chars[name] = {};
	chars[name].x = chars[name].y = 0;
	chars[name].img = new Image();
	chars[name].frame = [0, 1]; //frame 0 out of 1
	chars[name].vis = [0, 0, 7, 14];
	chars[name].img.src = "assets/sprites/"+name+".png";
}

function setChar(name, x, y) {
	let c = chars[name];
	if (x && y) {
		c.x = x;
		c.y = y;
	}
}

function moveChar(name, axis, dir) {
	let c = chars[name];
	let b = backgrounds[scenes[scenes.current].bg].boundary;

	if (axis=='x') {
		let w = c.vis[2];
		let a = c.x+dir;
		if (a < b[0]-1 || a+w > b[0]+b[2]+1) { return }
		c.x += dir;
		if (dir < 0) {
			changeFace(name, 'left')
		} else {
			changeFace(name, 'right')
		}
	}
	if (axis=='y') {
		let h = c.vis[3]/2;
		let a = c.y+dir;
		if (a < b[1]-1 || a+h > b[1]+b[3]+1) { return }
		c.y += dir;
	}

	animateChar(name)
}

function changeFace(name, face) {
	let c = chars[name];

	if (face=='right') {
		c.vis[1] = 0
	} else {
		c.vis[1] = c.vis[3]
	}
}

function animateChar(name, f) {
	let c = chars[name];

	if (f) {
		c.frame[0] = f;
		c.vis[0] = c.vis[2] * c.frame[0];
		return
	}

	if (c.frame[0] < c.frame[1]) {
		c.frame[0]++
	} else {
		c.frame[0] = 0
	}

	c.vis[0] = c.vis[2] * c.frame[0]
}

function stopChars() {
	let cs = scenes[scenes.current].chars;

	for (let i=0; i<cs.length; i++) {
		let c = cs[i].name;
		if (chars[c].frame[0] != 0) {
			animateChar(c, 0)
		}
	}
}

//loop
function drawChars() {
	let cs = scenes[scenes.current].chars;

	if (cs) {
		for (let i=0; i<cs.length; i++) {
			let c = chars[cs[i].name];
			char_context.drawImage(c.img, c.vis[0], c.vis[1], c.vis[2], c.vis[3], c.x*ps, c.y*ps, c.vis[2]*ps, c.vis[3]*ps);
		}
	}
}