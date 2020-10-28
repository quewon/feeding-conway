const behavior = {};

behavior.lazy = {};
behavior.lazy.color = colors.e;
behavior.lazy.func = function(cell) {
	let neighbors = surroundingSameBehavior(cell).length;
	if (neighbors<2 || neighbors>3) {
		clear_cells.push(cell)
	} else {
		behavior.lazy.cells.push(cell)
	}

	//a dead cell with 3 neighbors becomes a live cell
	let dead_cells = surrounding(cell).filter( (el) => !surroundingActive(cell).includes(el));
	for (let i=0; i<dead_cells.length; i++) {
		let dc = dead_cells[i];
		let neighbors = surroundingSameBehavior(dc).length;
		if (neighbors==3) {
			behavior.lazy.cells.push(dc)
		} else {
			clear_cells.push(dc)
		}
	}
};
behavior.lazy.cells = [];

behavior.firey = {};
behavior.firey.color = colors.c;
behavior.firey.func = function(cell) {
	let neighbors = surroundingActive(cell).length;
	if (neighbors<2 || neighbors>3) {
		clear_cells.push(cell)
	} else {
		behavior.firey.cells.push(cell)
	}

	//a dead cell with 3 neighbors becomes a live cell
	let dead_cells = surrounding(cell).filter( (el) => !surroundingActive(cell).includes(el));
	for (let i=0; i<dead_cells.length; i++) {
		let dc = dead_cells[i];
		let neighbors = surroundingActive(dc).length;
		if (neighbors==3) {
			behavior.firey.cells.push(dc)
		} else {
			clear_cells.push(dc)
		}
	}
};
behavior.firey.cells = [];

var clear_cells = [];

function surrounding(cell) {
	let s = [];
	for (let i=0; i<cells.length; i++) {
		if (
			(cells[i].x==cells[cell].x-1 & cells[i].y==cells[cell].y-1) ||
			(cells[i].x==cells[cell].x-1 & cells[i].y==cells[cell].y) ||
			(cells[i].x==cells[cell].x-1 & cells[i].y==cells[cell].y+1) ||
			(cells[i].x==cells[cell].x & cells[i].y==cells[cell].y-1) ||
			(cells[i].x==cells[cell].x & cells[i].y==cells[cell].y+1) ||
			(cells[i].x==cells[cell].x+1 & cells[i].y==cells[cell].y-1) ||
			(cells[i].x==cells[cell].x+1 & cells[i].y==cells[cell].y) ||
			(cells[i].x==cells[cell].x+1 & cells[i].y==cells[cell].y+1)) {
			s.push(i);
		}
	}

	return s
}

function surroundingActive(cell) {
	let cs = surrounding(cell);
	let sa = [];

	for (let i=0; i<cs.length; i++) {
		if (cells[cs[i]].behavior != undefined) {
			sa.push(cs[i]);
		}
	}

	return sa
}

function surroundingSameBehavior(cell) {
	let cs = surrounding(cell);
	let ssb = [];

	for (let i=0; i<cs.length; i++) {
		if (cells[cs[i]].color == cells[cell].color) {
			ssb.push(cs[i]);
		}
	}

	return ssb
}

function clearCell(cell) {
	active_cells.splice(active_cells.indexOf(cell), 1);
	cells[cell].behavior = undefined;
	cells[cell].color = colors.bg;
}

function setCell(cell, b) {
	if (!active_cells.includes(cell)) {
		active_cells.push(cell);
	}
	cells[cell].behavior = function() {
		behavior[b].func(cell)
	};
	cells[cell].color = behavior[b].color;
}

var updating = true;
function update() {
	if (updating) {
		//update cells
		for (let i=0; i<clear_cells.length; i++) {
			clearCell(clear_cells[i]);
		}
		clear_cells = [];

		for (let i=0; i<Object.keys(behavior).length; i++) {
			let b = Object.keys(behavior)[i];
			for (let ii=0; ii<behavior[b].cells.length; ii++) {
				setCell(behavior[b].cells[ii], b)
			}
			behavior[b].cells = [];
		}

		//active cells act
		for (let i=0; i<active_cells.length; i++) {
			let cell = cells[active_cells[i]];
			cell.behavior();
		}
	}
}