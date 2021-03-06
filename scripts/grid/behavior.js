colors = {};
colors.bg = '#ebf2e7';
colors.c = '#4e5c67';
colors.d = '#d3d9d3';
colors.e = '#90c1c1';
colors.f = '#4b858f';
colors.g = '#1c4d65';

const behavior = {};

behavior_names = {
	lazy: '🦥🦠',
	hungry: '🍽️🦠',
	popcorn: '🍿🦠',
	gooey: '❄️🦠'
}

var behavior_setting = 'lazy';

function subtractArray(a, b) {
	let i=0, len=a.length;
	let newarray = [];
	while (i<len) {
		if (!b.includes(a[i])) {
			newarray.push(a[i])
		}
		i++
	}
	return newarray
}

behavior.lazy = {};
behavior.lazy.color = colors.e;
behavior.lazy.func = function(cell) {
	let cs = surrounding(cell);

	let neighbors = surroundingSameBehavior(cell, cs).length;
	if (neighbors<2 || neighbors>3) {
		clear_cells.push(cell)
	} else {
		behavior.lazy.cells.push(cell)
	}

	//a dead cell with 3 neighbors becomes a live cell
	let dead_cells = subtractArray(cs, surroundingActive(cell, cs));

	let i=0, len = dead_cells.length;
	while (i < len) {
		let dc = dead_cells[i];
		let neighbors = surroundingSameBehavior(dc).length;
		if (neighbors==3) {
			behavior.lazy.cells.push(dc)
		} else {
			clear_cells.push(dc)
		}
		i++
	}
};
behavior.lazy.cells = [];

behavior.hungry = {};
behavior.hungry.color = colors.c;
behavior.hungry.func = function(cell) {
	let cs = surrounding(cell);

	let neighbors = surroundingActive(cell, cs).length;
	if (neighbors<2 || neighbors>3) {
		clear_cells.push(cell)
	} else {
		behavior.hungry.cells.push(cell)
	}

	let dead_cells = subtractArray(cs, surroundingActive(cell, cs));

	let i=0, len = dead_cells.length;
	while (i < len) {
		let dc = dead_cells[i];
		let neighbors = surroundingActive(dc).length;
		if (neighbors==3) {
			behavior.hungry.cells.push(dc)
		} else {
			clear_cells.push(dc)
		}
		i++
	}
};
behavior.hungry.cells = [];

behavior.popcorn = {};
behavior.popcorn.color = colors.d;
behavior.popcorn.func = function(cell) {
	let cs = surrounding(cell);

	let neighbors = surroundingActive(cell, cs).length;
	if (neighbors<2 || neighbors>3) {
		clear_cells.push(cell)
	} else {
		behavior.popcorn.cells.push(cell)
	}

	//change cells that are different colors
	let dead_cells = subtractArray(cs, surroundingSameBehavior(cell, cs));

	let i=0, len = dead_cells.length;
	while (i < len) {
		let dc = dead_cells[i];
		let neighbors = cs.filter( (el) => surroundingBehavior(cell, cs, 'popcorn').includes(el)).length;
		if (neighbors==3) {
			behavior.popcorn.cells.push(dc)
		} else {
			clear_cells.push(dc)
		}
		i++
	}
};
behavior.popcorn.cells = [];

behavior.gooey = {};
behavior.gooey.color = colors.f;
behavior.gooey.func = function(cell) {
	let cs = surrounding(cell);

	let neighbors = surroundingActive(cell, cs).length;
	if (neighbors==5) {
		clear_cells.push(cell)
	} else {
		behavior.gooey.cells.push(cell)
	}

	let dead_cells = subtractArray(cs, surroundingActive(cell, cs));

	let i=0, len = dead_cells.length;
	while (i < len) {
		let dc = dead_cells[i];
		let neighbors = cs.filter( (el) => surroundingBehavior(dc, null, 'gooey').includes(el)).length;
		if (neighbors>2) {
			behavior.gooey.cells.push(dc)
		} else {
			clear_cells.push(dc)
		}
		i++
	}
};
behavior.gooey.cells = [];

var clear_cells = [];

function surrounding(cell) {
	return cells[cell].surrounding;
}

function surroundingActive(cell, cs) {
	cs = cs || surrounding(cell);
	let sa = [];

	let i=0, len = cs.length;
	while (i<len) {
		if (cells[cs[i]].behavior != undefined) {
			sa.push(cs[i]);
		}
		i++
	}

	return sa
}

function surroundingSameBehavior(cell, cs) {
	cs = cs || surrounding(cell);
	let ssb = [];

	let i=0, len=cs.length;
	while (i<len) {
		if (cells[cs[i]].color == cells[cell].color) {
			ssb.push(cs[i]);
		}
		i++
	}

	return ssb
}

function surroundingBehavior(cell, cs, b) {
	cs = cs || surrounding(cell);
	let sb = [];

	let i=0, len=cs.length;
	while (i<len) {
		if (cells[cs[i]].color == behavior[b].color) {
			sb.push(cs[i]);
		}
		i++
	}

	return sb
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