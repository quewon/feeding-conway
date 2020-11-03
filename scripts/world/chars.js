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
	chars[name].interaction = INTERACT[name];
	chars[name].facing_right = false;
}

function setChar(name, x, y, dir) {
	let c = chars[name];
	if (x && y) {
		c.x = x;
		c.y = y;
	}
	if (dir=='left') {
		changeFace(name, dir)
	}
}

function moveChar(name, axis, dir) {
	if ('bg' in scenes[scenes.current]) {
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
}

var outlined;
//https://stackoverflow.com/a/28416298/9375514
function outlineChar(name) {
	outlined = name;

	var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1], // offset array
	    s = ps-1,  // thickness scale
	    i = 0,  // iterator
	    x = 5,  // final position
	    y = 5;

	let c = chars[name];
	let offset = 5;
	  
 	for(; i < dArr.length; i += 2)
 		char_context.drawImage(c.img, c.vis[0], c.vis[1], c.vis[2], c.vis[3], (x+dArr[i]*s)+c.x*ps-offset, (y+dArr[i+1]*s)+c.y*ps-offset, c.vis[2]*ps, c.vis[3]*ps);
	  
	char_context.globalCompositeOperation = "source-in";

	//if (lightOrDark(document.body.style.backgroundColor)=='light') { char_context.fillStyle = "#1c4d65" } else { char_context.fillStyle = "#ebf2e7" }
	char_context.fillStyle = "#ebf2e7";
	char_context.fillRect(c.x*ps,c.y*ps,c.vis[2]*ps, c.vis[3]*ps);

	char_context.globalCompositeOperation = "source-over";

	//potential performance suck - draws all sprites twice
	drawChars();
}

//https://codepen.io/andreaswik/pen/YjJqpK
function lightOrDark(color) {
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  } 
  else {

    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace( 
      color.length < 5 && /./g, '$&$&'
    )
             );

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp>127.5) {

    return 'light';
  } 
  else {

    return 'dark';
  }
}

function changeFace(name, face) {
	let c = chars[name];

	if (face=='right') {
		c.vis[1] = 0;
		c.facing_right = true
	} else {
		c.vis[1] = c.vis[3];
		c.facing_right = false
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

	if (cs) {
		for (let i=0; i<cs.length; i++) {
			let c = cs[i].name;
			if (chars[c].frame[0] != 0) {
				animateChar(c, 0)
			}
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