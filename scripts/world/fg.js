//init
var fg = document.getElementById("fg");
var fg_context = fg.getContext("2d");
var world_style = getComputedStyle(document.getElementById('world'));
fg.width = parseInt(world_style["width"]);
fg.height = parseInt(world_style["height"]);
fg_context.imageSmoothingEnabled = false;

var foregrounds = {};

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

	if (cursor.x && cursor.y) {
		fg_context.fillStyle = "#1c4d65";
		fg_context.fillRect(cursor.x,cursor.y,1*ps,1*ps);
		fg_context.fillRect(cursor.x-ps,cursor.y,1*ps,1*ps);
		fg_context.fillRect(cursor.x+ps,cursor.y,1*ps,1*ps);
		fg_context.fillRect(cursor.x,cursor.y-ps,1*ps,1*ps);
		fg_context.fillRect(cursor.x,cursor.y+ps,1*ps,1*ps);
	}
}