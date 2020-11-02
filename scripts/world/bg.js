//init
var world = document.getElementById("world");
world.on = false;

var bg = document.getElementById("bg");
var bg_context = bg.getContext("2d");
var world_style = getComputedStyle(document.getElementById('world'));
bg.width = parseInt(world_style["width"]);
bg.height = parseInt(world_style["height"]);
bg_context.imageSmoothingEnabled = false;
var background;

var ps = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

var backgrounds = {};

createBG('train_car', 44, 58, 68, 21);

function createBG(name, x, y, width, height) {
	backgrounds[name] = {};
	backgrounds[name].img = new Image();
	backgrounds[name].img.src = "assets/bg/"+name+".png";
	backgrounds[name].boundary = [x, y, width, height];
}

function setBG(name) {
	document.body.style.backgroundColor = getColorOfPixel(1, 1);

	var div = document.createElement("div");
	let b = backgrounds[name].boundary;
	div.style.top = b[0]+"px";
	div.style.left = b[1]+"px";
	div.style.width = b[2]+"px";
	div.style.height = b[3]+"px";
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

//loop
function drawBG() {
	let background = backgrounds[scenes[scenes.current].bg];

	if (background) {
		bg_context.drawImage(background.img, 0, 0, background.img.width*ps, background.img.height*ps);
		
		//debug
		//bg_context.fillRect(background.boundary[0]*ps, background.boundary[1]*ps, background.boundary[2]*ps, background.boundary[3]*ps)
	}
}