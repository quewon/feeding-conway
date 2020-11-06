mouse = {x:0,y:0,down:false};

colors = {};
colors.bg = '#ebf2e7';
colors.c = '#4e5c67';
colors.d = '#d3d9d3';
colors.e = '#90c1c1';
colors.f = '#4b858f';
colors.g = '#1c4d65';

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

	if (world.on) {
		worldKeyup(k)
	}
})

window.onresize = function() {
    rect = bg.getBoundingClientRect();
};