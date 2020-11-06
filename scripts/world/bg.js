//init
var world = document.getElementById("world");
world.on = false;
var text = document.getElementById("text");

var bg = document.getElementById("bg");
var bg_context = bg.getContext("2d");
var world_style = getComputedStyle(document.getElementById('world'));
bg.width = parseInt(world_style["width"]);
bg.height = parseInt(world_style["height"]);
bg_context.imageSmoothingEnabled = false;

var ps = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

//doors
var doors = {};
var door_icon = document.getElementById("door_icon");
function createDoor(name, vis0, vis1, vis2, vis3) {
	doors[name] = {};
	doors[name].img = new Image();
	doors[name].img.src = "assets/sprites/"+name+".png";
	doors[name].vis = [vis0, vis1, vis2, vis3];
}

var available_door = undefined;
function openDoor(i) {
	if (i==undefined) { return }

	let s = scenes[scenes.current];
	let door = s.doors[i];
	let c = doors[door.name];
	let d = door.destination;

	c.vis[0] = 0;
	let framesize = c.vis[2]+1;
	let frames = ((c.img.width-c.vis[2])/framesize);

	for (let i=1; i<frames; i++) {
		setTimeout(function() {
			c.vis[0] += framesize;
		},300*i)
	}
	setTimeout(function() {
		let s = scenes.current;
		setScene(d);

		if ('doors' in scenes[s]) {
			let ds = scenes[s].doors;
			for (let i=0; i<ds.length; i++) {
				if (ds[i].destination==s) {
					closeDoor(ds[i].name)
				}
			}
		}
	}, 300*frames)
}

function closeDoor(i) {
	let s = scenes[scenes.current];
	let door = s.doors[i];
	let c = doors[door.name];
	let d = door.destination;
	
	c.vis[0] = c.img.width-c.vis[2];
	let framesize = c.vis[2]+1;
	let frames = ((c.img.width-c.vis[2])/framesize)+1;

	for (let i=1; i<frames; i++) {
		setTimeout(function() {
			c.vis[0] -= framesize;
		},300*i);
	}
}

//backgrounds
var backgrounds = {};
function createBG(name, x, y, width, height, color, align_dialog
	) {
	color = color || "#ebf2e7";
	if (color=='light') {
		color = "#ebf2e7"
	} else if (color=='dark') {
		color = "#4e5c67"
	}
	align_dialog = align_dialog || 'up';
	backgrounds[name] = {};
	backgrounds[name].img = new Image();
	backgrounds[name].img.src = "assets/bg/"+name+".png";
	backgrounds[name].boundary = [x, y, width, height];
	backgrounds[name].color = color;
	backgrounds[name].align_dialog = align_dialog;
}

function setBG(name) {
	if (backgrounds[name].align_dialog=="up") {
		dialog_box.className = "up"
	} else {
		dialog_box.className = "down"
	}

	document.body.style.backgroundColor = backgrounds[name].color;
}

//i dont need this function anymore but i wanna keep it around
function getColorOfPixel(x, y) {
	let p = bg_context.getImageData(x, y, 1, 1).data;
	let color = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	if (color=="#000000") {
		color = "#4e5c67"
	}
	return color;

	function rgbToHex(r, g, b) {
	    if (r > 255 || g > 255 || b > 255)
	        throw "Invalid color component";
	    return ((r << 16) | (g << 8) | b).toString(16);
	}
}

//parallax
var parallaxs = {};
function createPX(name, speed) {
	parallaxs[name] = {};
	parallaxs[name].img = new Image();
	parallaxs[name].img.src = "assets/bg/"+name+".png";
	if (speed != 0) {
		parallaxs[name].speed = speed;
		parallaxs[name].counter = 0;
	}
}
var px = document.getElementById("px");
px.width = parseInt(world_style["width"]);
px.height = parseInt(world_style["height"]);
var px_context = px.getContext('2d');
px_context.imageSmoothingEnabled = false;

//loop
function drawBG() {
	let s = scenes[scenes.current];

	if ('parallax' in s) {
		let p = parallaxs[s.parallax];

		if ('counter' in p) {
			p.counter+=p.speed;
			if (p.counter>p.img.width*2/3*ps) {
				p.counter = 0
			}
			px_context.drawImage(p.img, 0-p.counter, 0, p.img.width*ps, p.img.height*ps);
		} else {
			px_context.drawImage(p.img, 0, 0, p.img.width*ps, p.img.height*ps);
		}
	}

	if ('bgsbg' in s) {
		let b = parallaxs[s.bgsbg];
		px_context.drawImage(b.img, 0, 0, b.img.width*ps, b.img.height*ps);
	}

	if ('bg' in s) {
		let background = backgrounds[s.bg];
		bg_context.drawImage(background.img, 0, 0, background.img.width*ps, background.img.height*ps);
	}

	if ('doors' in s) {
		let ds = s.doors;
		for (let i=0; i<ds.length; i++) {
			let d = doors[ds[i].name];
			bg_context.drawImage(d.img, d.vis[0], d.vis[1], d.vis[2], d.vis[3], ds[i].x*ps, ds[i].y*ps, d.vis[2]*ps, d.vis[3]*ps)
		}
	}
}