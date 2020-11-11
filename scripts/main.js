function animate() {
	requestAnimationFrame(animate);

	if (grid.on) {
		grid_context.clearRect(0, 0, grid.width, grid.height);

		drawGrid();
		grid.update();
	}

	if (world.on) {
		bg_context.clearRect(0,0,bg.width,bg.height);
		char_context.clearRect(0,0,bg.width,bg.height);
		fg_context.clearRect(0,0,bg.width,bg.height);
		px_context.clearRect(0,0,bg.width,bg.height);
		drawBG();
		drawChars();
		drawFG();

		world.update();
	}
}

window.addEventListener("keypress", function(e) {
	let k = e.keyCode || e.which;

	if (grid.on) {
		gridKeypress(k)
	}
});

window.addEventListener("keyup", function(e) {
	let k = e.keyCode || e.which;

	worldKeyup(k);
});

window.onclick = function(e) {
	if (grid.on) { gridClick(e) }
}

window.onresize = function() {
    world_rect = bg.getBoundingClientRect();
    grid_rect = grid.getBoundingClientRect();
};

var container = document.getElementById("container");
window.onmousemove = function(e) {
	if (grid.on) { gridMousemove(e) }
	worldMousemove(e);
}
window.onmouseout = function(e) {
	worldMouseout(e)
}