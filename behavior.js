const behavior = {};

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

var unused_warp_effect = function(cell) {
	let cs = surrounding(cell);

	let neighbors = surroundingActive(cell, cs).length;
	if (neighbors==5) {
		clear_cells.push(cell)
	} else {
		behavior.gooey.cells.push(cell)
	}

	//a dead cell with 3 neighbors becomes a live cell
	let dead_cells = cs.filter( (el) => !surroundingActive(cell, cs).includes(el));
	for (let i=0; i<dead_cells.length; i++) {
		let dc = dead_cells[i];
		let neighbors = surroundingActive(dc).length;
		if (neighbors > 2) {
			behavior.gooey.cells.push(dc)
		} else {
			clear_cells.push(dc)
		}
	}
};

var clear_cells = [];

function surrounding(cell) {
	let cisc = getCellsInSameChunk(cell);
	let s = [], i = 0, len = cisc.length;

	while (i < len) {
		let x = cells[cisc[i]].x, y = cells[cisc[i]].y;
		let cx = cells[cell].x, cy = cells[cell].y;

		if (
			( (x == cx+1 || x == cx-1) && (y == cy+1 || y == cy-1) ) ||
			( x == cx && (y-1 == cy || y+1 == cy) ) ||
			( (x-1 == cx || x+1 == cx) && y == cy )
			) {
			s.push(cisc[i])
		}

		i++
	}

	return s
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
	}
}