//init
var fg = document.getElementById("fg");
var fg_context = fg.getContext("2d");
var world_style = getComputedStyle(document.getElementById('world'));
fg.width = parseInt(world_style["width"]);
fg.height = parseInt(world_style["height"]);
fg_context.imageSmoothingEnabled = false;

var foregrounds = {};

createFG('train_car_fg');

function createFG(name) {
	foregrounds[name] = {};
	foregrounds[name].img = new Image();
	foregrounds[name].img.src = "assets/bg/"+name+".png";
}

function drawFG() {
	let foreground = foregrounds[scenes[scenes.current].fg];

	if (foreground) {
		fg_context.drawImage(foreground.img, 0, 0, foreground.img.width*ps, foreground.img.height*ps);
	}
}