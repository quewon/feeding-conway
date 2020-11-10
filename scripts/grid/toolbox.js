var grids = {};

function emptyGrid() {
	let bs = Object.keys(behavior);
	let i=0, len = bs.length;
	while (i<len) {
		let b = behavior[bs[i]];
		let ii=0, lenn=b.cells.length;
		while (ii<lenn) {
			clearCell(b.cells[ii])
			ii++
		}
		b.cells = [];
		i++
	}
}

function saveGrid(name) {
	if (name in grids) {
		name = name+"+";
		saveGrid(name);
		return
	}

	grids[name] = [];
	let i=0;
	while (i<cell_length) {
		grids[name].push(cells[i].color)
		i++
	}
}

function loadGrid(g) {
	emptyGrid();
	g = grids[g];
	let bs = Object.keys(behavior);
	let i=0;
	while (i<cell_length) {
		if (g[i] != undefined) {
			for (let ii=0; ii<bs.length; ii++) {
				let b = behavior[bs[ii]];
				if (g[i]==b.color) {
					b.cells.push(i)
				}
			}
		}
		i++
	}
}

var tray = document.getElementById("tray");

function extract() {
	let meaningless_extraction = true;

	if (tray.style.display=='none') { tray.style.display = 'block' }

	//get cells you're extracting
	let hl = cells[getCell(highlight.x, highlight.y)];
	let c = [];
	let s = (extract_size*2)-1;

	let fx = hl.x-extract_size+1;
	let fy = hl.y-extract_size+1;

	let i=0;
	while (i<s) {
		let ii=0;
		while (ii<s) {
			let color;
			let e = getCell((fx+ii)*cellsize, (fy+i)*cellsize);
			if (e==undefined) {
				color = colors.bg;
			} else {
				color = cells[e].color;
			}

			if (color!=colors.bg) {
				meaningless_extraction = false;
				let bs = Object.keys(behavior);
				bi=0; len=bs.length;
				while (bi<len) {
					let b = behavior[bs[bi]];
					if (color==b.color) {
						b.cells.splice(b.cells.indexOf(e), 1);
						clearCell(e);
					}
					bi++
				}
			}

			c.push(color);
			ii++
		}
		i++
	}

	if (meaningless_extraction) { return }

	//create canvas
	let canvas = document.createElement('canvas');
	let canvas_context = canvas.getContext('2d');
	canvas.className = "sample";
	tray.appendChild(canvas);

	//draw cells on canvas
	canvas.width = canvas.height = s*cellsize;
	let csize = canvas.width / 2;
	canvas.style.width = canvas.style.height = csize+"px";
	canvas_context.fillStyle = highlight.color;

	i=0; iii=0;
	while (i<s) {
		let ii=0;
		while (ii<s) {
			canvas_context.fillStyle = c[iii];
			canvas_context.fillRect(ii*cellsize, i*cellsize, cellsize, cellsize);
			iii++
			ii++
		}
		i++
	}

	canvas.celldata = c;
}

function place() {
	let data = tray.querySelector('canvas').celldata;
}