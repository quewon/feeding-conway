mouse = {x:0,y:0,down:false};

colors = {};
colors.bg = '#303030';
colors.a = '#4d4d4d';
colors.b = '#ee6a7c';
colors.c = '#ffa7a5'; //lazy
colors.d = '#ffe07e';
colors.e = '#72dcbb'; //firey
colors.f = '#34acba';
colors.g = '#ffe7d6';

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

	if (world.on) {
		worldKeypress(k)
	}
});