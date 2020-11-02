//init
var world = document.getElementById("world");
world.on = false;

var bg = document.getElementById("bg");
var bg_context = bg.getContext("2d");
var world_style = getComputedStyle(document.getElementById('world'));
bg.width = parseInt(world_style["width"]);
bg.height = parseInt(world_style["height"]);
bg_context.imageSmoothingEnabled = false;

var ps = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

var backgrounds = {};

//functions
function createBG(name, x, y, width, height, bg) {
	backgrounds[name] = {};
	backgrounds[name].img = new Image();
	backgrounds[name].img.src = "assets/bg/"+name+".png";
	backgrounds[name].boundary = [x, y, width, height];
	if (bg) {
		backgrounds[name].bg = bg
	}
}

function setBG(name) {
	//document.body.style.backgroundColor = getColorOfPixel(1, 1);
}

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
		parallaxs[name].flip = new Image();
		parallaxs[name].flip.src = "assets/bg/"+name+"_flipped.png";
	}
}
var px = document.getElementById("px");
px.width = parseInt(world_style["width"]);
px.height = parseInt(world_style["height"]);
var px_context = px.getContext('2d');
px_context.imageSmoothingEnabled = false;

//loop
function drawBG() {
	if (scenes[scenes.current].parallax) {
		let p = parallaxs[scenes[scenes.current].parallax];

		if ('counter' in p) {
			p.counter+=p.speed;
			if (p.counter>p.img.width*10) {
				p.counter = 0
			}
			px_context.drawImage(p.img, 0-p.counter, 0, p.img.width*ps, p.img.height*ps);
			px_context.drawImage(p.flip, p.img.width*ps-p.counter, 0, p.img.width*ps, p.img.height*ps);
			px_context.drawImage(p.img, p.img.width*2*ps-p.counter, 0, p.img.width*ps, p.img.height*ps);
		} else {
			px_context.drawImage(p.img, 0, 0, p.img.width*ps, p.img.height*ps);
		}
	}

	let background = backgrounds[scenes[scenes.current].bg];

	if (background) {
		if (background.bg) {
			let i = parallaxs[background.bg];
			px_context.drawImage(i.img, 0, 0, i.img.width*ps, i.img.height*ps);
		}

		bg_context.drawImage(background.img, 0, 0, background.img.width*ps, background.img.height*ps);
	}
}