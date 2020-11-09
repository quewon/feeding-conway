//init
var grid = document.getElementById('grid');
var grid_context = grid.getContext('2d');
grid.height = grid.width = parseInt(getComputedStyle(grid)["width"]);
grid.on = false;

var cellsize = ps*2;
//number of chunks on axis (there are chunks^2 chunks)
var chunks = 4;

var cells = [];
var active_cells = [];
var cell_length = cell_v = cell_h = 0;

function genCells() {
	let vc = Math.ceil(grid.height / cellsize);
	let hc = Math.ceil(grid.width / cellsize);

	let cellnumber = 0;

	for (let i=0; i<vc; i++) {
		for (let ii=0; ii<hc; ii++) {
			cells[cellnumber] = {};
			cells[cellnumber].x = ii;
			cells[cellnumber].y = i;
			cells[cellnumber].chunk = setChunk(cellnumber);
			cells[cellnumber].color = colors.bg;
			cells[cellnumber].behavior = undefined;
			cellnumber++;
		}
	}

	cell_length = cells.length;
	
	getChunkArray();
}

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

var grids = {};

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

//animation
function drawGrid() {
	let i=0;
	while (i < cell_length) {
		grid_context.fillStyle = cells[i].color;
		grid_context.fillRect(cells[i].x * cellsize, cells[i].y * cellsize, cellsize, cellsize);
		i++
	}

	let hl = cells[getCell(highlight.x, highlight.y)];
	if (hl != undefined) {
		grid_context.fillStyle = highlight.color;
		if (mouse.mode=='set') {
			grid_context.fillRect((hl.x-1)*cellsize, hl.y*cellsize, cellsize, cellsize);
			grid_context.fillRect(hl.x*cellsize, hl.y*cellsize, cellsize, cellsize);
			grid_context.fillRect((hl.x+1)*cellsize, hl.y*cellsize, cellsize, cellsize);
			grid_context.fillRect(hl.x*cellsize, (hl.y+1)*cellsize, cellsize, cellsize);
			grid_context.fillRect(hl.x*cellsize, (hl.y-1)*cellsize, cellsize, cellsize);
		}

		else if (mouse.mode=='extract') {
			i=extract_size*-1;
			while(i<extract_size+1) {
				grid_context.fillRect((hl.x-extract_size)*cellsize, (hl.y+i)*cellsize, cellsize, cellsize);
				i++
			}
			i=extract_size*-1;
			while(i<extract_size+1) {
				grid_context.fillRect((hl.x+extract_size)*cellsize, (hl.y+i)*cellsize, cellsize, cellsize);
				i++
			}
			i=extract_size*-1;
			while(i<extract_size+1) {
				grid_context.fillRect((hl.x+i)*cellsize, (hl.y+extract_size)*cellsize, cellsize, cellsize);
				i++
			}
			i=extract_size*-1;
			while(i<extract_size+1) {
				grid_context.fillRect((hl.x+i)*cellsize, (hl.y-extract_size)*cellsize, cellsize, cellsize);
				i++
			}
		}
	}
}

function getChunkArray() {
	chunk_array = [];
	let ix=iy=0;
	while (ix<chunks) {
		chunk_array[ix] = [];
		iy=0;
		while(iy < chunks) {
			chunk_array[ix][iy] = [];

			let i=0, len=cell_length;
			while (i<len) {
				let cx = cells[i].chunk.x;
				let cy = cells[i].chunk.y;

				if (cx.includes(ix) && cy.includes(iy)) {
					chunk_array[ix][iy].push(i)
				}
				i++
			}
			iy++
		}
		ix++
	}

	for (i=0; i<cell_length; i++) {
		cells[i].surrounding = setSurrounding(i);
	}
}

function setChunk(cell) {
	let cell_v = Math.floor(grid.height / cellsize)-1;
	let cell_h = Math.floor(grid.width / cellsize)-1;

	let chunk={x:[],y:[]};
	cell = cells[cell];

	//get horizontal chunk
	let i=0, len=chunks;
	while (i<len) {
		let border_right = Math.ceil(cell_h/chunks * (i+1));
		let border = Math.ceil(cell_h/chunks * i);

		if (cell.x > border && cell.x < border_right) {
			chunk.x.push(i)
		} else {
			if (cell.x   == border_right ||
				cell.x-1 == border_right ||
				cell.x+1 == border_right)
			{
				chunk.x.push(i)
			}

			if (cell.x   == border ||
				cell.x-1 == border ||
				cell.x+1 == border)
			{
				chunk.x.push(i)
			}
		}
		i++
	}

	//get vertical chunk
	i=0;
	while (i<len) {
		let border_bottom = Math.ceil(cell_v/chunks * (i+1));
		let border = Math.ceil(cell_v/chunks * i);

		if (cell.y > border && cell.y < border_bottom) {
			chunk.y.push(i)
		} else {
			if (cell.y   == border_bottom ||
				cell.y-1 == border_bottom ||
				cell.y+1 == border_bottom)
			{
				chunk.y.push(i)
			}

			if (cell.y   == border ||
				cell.y-1 == border ||
				cell.y+1 == border)
			{
				chunk.y.push(i)
			}
		}
		i++
	}

	return chunk
}

function getCellsInSameChunk(cell) {
	let array = [];

	let x = cells[cell].chunk.x;
	let y = cells[cell].chunk.y;

	let ix=iy=0;
	while (ix<chunks) {
		iy=0;
		while(iy < chunks) {
			if (x.includes(ix) && y.includes(iy)) {
				array = array.concat(chunk_array[ix][iy]);
			}
			iy++
		}
		ix++
	}

	//remove duplicates from array
	let seen = {};
    let out = [];
    let len = array.length;
    let j = 0;
    for(let i = 0; i < len; i++) {
         let item = array[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    array = out;

	//debug
	//for (i=0; i<chunk_array[x][y].length; i++) { cells[chunk_array[x][y][i]].color = getRandomColor(); }

	return array
}

function setSurrounding(cell) {
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

function getCell(x, y) {
	let i=0;
	while (i < cell_length) {
		if (cells[i].x==Math.floor(x/cellsize) && cells[i].y==Math.floor(y/cellsize)) {
			return i
		}
		i++
	}

	return null
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}