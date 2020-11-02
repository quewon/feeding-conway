grid.status = true;
grid.speed = 2;
grid.counter = 0;
grid.update = function() {
	if (grid.status && grid.speed<=grid.counter) {
		//update cells
		let i=0, len=clear_cells.length;
		while (i<len) {
			clearCell(clear_cells[i]);
			i++
		}
		clear_cells = [];

		let bs = Object.keys(behavior);
		i=0, len = bs.length;
		while (i<len) {
			let b = behavior[bs[i]];
			let ii=0, lenn=b.cells.length;
			while (ii<lenn) {
				setCell(b.cells[ii], bs[i])
				ii++
			}
			b.cells = [];
			i++
		}

		//active cells act
		i=0, len=active_cells.length;
		while (i<len) {
			cells[active_cells[i]].behavior();
			i++
		}
		grid.counter = -1
	}
	grid.counter++
};

grid.onmousedown = function() {
	if (grid.on) { mouse.down = true }
};
window.onmouseup = function() { mouse.down = false };

grid.ontouchstart = function() {
	if (grid.on) { mouse.down = true }
};
window.ontouchend = function() {
	mouse.down = false;
	highlight.x = highlight.y = undefined;
};

var highlight = {x:undefined,y:undefined,color:colors.g};

window.onclick = function(e) {
	if (mouse.x >= 0 && mouse.x <= grid.width && mouse.y >= 0 && mouse.y <= grid.height) {
		let cell = getCell(mouse.x,mouse.y);
		setCell(cell, behavior_setting);
		behavior[behavior_setting].cells.push(cell);

		//debug(cell)
	}
}

function gridKeypress(k) {
	if (k===32) {
		event.preventDefault();
		updating = !updating;
	}
}

function debug(cell) {
	let cs = surrounding(cell);
	console.log(cell, cs);
	for (i=0; i<cs.length; i++) { cells[cs[i]].color = getRandomColor(); }
}

function gridMouse(e) {
	let rect = grid.getBoundingClientRect();

	mouse.x = e.clientX || e.touches[0].clientX;
	mouse.y = e.clientY || e.touches[0].clientY;

	mouse.x = (mouse.x - rect.left) / (rect.right - rect.left) * grid.width;
	mouse.y = (mouse.y - rect.top) / (rect.bottom - rect.top) * grid.height;

	highlight.x = mouse.x;
	highlight.y = mouse.y;

	if (mouse.down && mouse.x >= 0 && mouse.x <= grid.width && mouse.y >= 0 && mouse.y <= grid.height) {
		let cell = getCell(mouse.x,mouse.y);
		setCell(cell, behavior_setting);
		behavior[behavior_setting].cells.push(cell);

		//debug(cell)
	}
}

window.onmousemove = function(e) {
	gridMouse(e)
};

window.ontouchmove = function(e) {
	gridMouse(e)
}