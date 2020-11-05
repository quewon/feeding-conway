//init
var char = document.getElementById("chars");
var char_context = char.getContext("2d");
char.width = bg.width;
char.height = bg.height;
char_context.imageSmoothingEnabled = false;

//chars
var chars = {};

function createChar(name, has_face, vis0, vis1, vis2, vis3, no_alpha) {
	has_face = has_face || true;
	vis0 = vis0 || 0;
	vis1 = vis1 || 0;
	vis2 = vis2 || 7;
	vis3 = vis3 || 14;

	chars[name] = {};
	chars[name].x = chars[name].y = 0;
	chars[name].img = new Image();
	chars[name].frame = [0, 1]; //frame 0 out of 1
	chars[name].vis = [vis0, vis1, vis2, vis3];
	chars[name].img.src = "assets/sprites/"+name+".png";
	chars[name].interaction = INTERACT[name];
	if (has_face) {
		chars[name].facing_right = false;
	}
	if (no_alpha) {
		chars[name].no_alpha = true
	}
}

function setChar(name, x, y, dir) {
	let c = chars[name];
	if (x) {
		c.x = x+1;
	}
	if (y) { 
		c.y = y-2;
	}
	if (dir=='left' && 'facing_right' in c) {
		changeFace(name, dir)
	}
}

function moveChar(name, axis, dir, fromtrigger) {
	let c = chars[name];
	let blocked;

	if ('bg' in scenes[scenes.current]) {
		let b = backgrounds[scenes[scenes.current].bg].boundary;

		if (axis=='x') {
			let w = c.vis[2];
			let a = c.x+dir;
			if (a < b[0]-1 || a+w > b[0]+b[2]+1) {
				blocked = true
			} else {
				c.x += dir;
			}
			if ('facing_right' in c) {
				if (dir < 0) {
					changeFace(name, 'left')
				} else {
					changeFace(name, 'right')
				}
			}
		}
		if (axis=='y') {
			let h = c.vis[3]/2;
			let a = c.y+dir;
			if (a < b[1]-1 || a+h > b[1]+b[3]+1) {
				blocked = true
			} else {
				c.y += dir;
			}
		}

		if (!blocked) { animateChar(name) }
	}

	if ('triggers' in scenes[scenes.current] && !fromtrigger) {
		let arr = scenes[scenaes.current].triggers;

		for (let i=0; i<arr.length; i++) {
			let t = arr[i];

			if (t[2].includes(name)) {
				if ((c.facing_right && c.x==t[0]) || (!c.facing_right && c.x==t[0]+1)) { t[1](name, true) }
				t[2].splice(t[2].indexOf(name),1);
			} else {
				let bw = backgrounds[scenes[scenes.current].bg].boundary[2];
				if(t[0]<0) {
					if(blocked && axis=='x' && dir==-1) {
						t[1](name);
					}
				} else if (t[0]>bw) {
					if(blocked && axis=='x' && dir==1) {
						t[1](name)
					}
				}

				if (c.x==t[0]-1) {
					t[1](name);
			    	t[2].push(name);
				}
			}
		}
	}
}

var outlined;
//https://stackoverflow.com/a/28416298/9375514
function outlineChar(name) {
	let c = chars[name];

	if ('no_alpha' in c) {
		char_context.fillStyle = "#ebf2e7";
		char_context.fillRect((c.x-1)*ps, (c.y-1)*ps, (c.vis[2]+2)*ps, (c.vis[3]+2)*ps);
		drawChars();
		return
	}

	var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1], // offset array
	    s = ps,  // thickness scale
	    i = 0,  // iterator
	    x = 5,  // final position
	    y = 5;

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

function playCharAnimation(name, extras) {
	let c = chars[name];

	c.vis[0] = 0;

	let framesize = c.vis[2]+1;
	let frames = ((c.img.width-c.vis[2])/framesize)+1;

	for (let i=1; i<frames; i++) {
		setTimeout(function() {
			c.vis[0] += framesize;
		},300*i)
	}

	if (extras) {
		setTimeout(function() {
			extras()
		},300*frames)
	}
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

//triggers
var TRIGGERS = {};
TRIGGERS.active = [];
TRIGGERS.stair_left = function(name, double) {
	let c = chars[name];

	//this was JUST triggered
	if (double) {
		if (c.facing_right) {
			moveChar(name, 'y', 1, true)
		} else {
			moveChar(name, 'y', -1, true)
		}
	} else {
		if (!c.facing_right) {
			moveChar(name, 'y', -1, true)
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

		//debug triggers
		//for (let i=0; i<scenes[scenes.current].triggers.length; i++) {char_context.fillStyle = "#FF0";char_context.fillRect(scenes[scenes.current].triggers[i][0]*ps, 0, ps, char.height)}
	}
}