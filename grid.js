var cells = [];
var active_cells = [];

function genEmptyCells() {
	let vc = Math.ceil(canvas.height / cellsize);
	let hc = Math.ceil(canvas.width / cellsize);

	let cellnumber = 0;

	for (let i=0; i<vc; i++) {
		for (let ii=0; ii<hc; ii++) {
			cells[cellnumber] = {};
			cells[cellnumber].x = ii;
			cells[cellnumber].y = i;
			cells[cellnumber].color = colors.bg;
			cells[cellnumber].behavior = undefined;
			cellnumber++;
		}
	}
}

function genRandomCells() {
	let vc = Math.ceil(canvas.height / cellsize);
	let hc = Math.ceil(canvas.width / cellsize);

	let cellnumber = 0;

	for (let i=0; i<vc; i++) {
		for (let ii=0; ii<hc; ii++) {
			cells[cellnumber] = {};
			cells[cellnumber].x = ii;
			cells[cellnumber].y = i;

			if (Math.floor(Math.random() * 5) == 1) {
				let b = Object.keys(behavior)[Math.floor(Math.random() * Object.keys(behavior).length)];
				setCell(cellnumber, b);
			} else {
				cells[cellnumber].color = colors.bg;
				cells[cellnumber].behavior = undefined;
			}
			cellnumber++;
		}
	}
}

function drawGrid() {
	for (let i=0; i<cells.length; i++) {
		c.fillStyle = cells[i].color;
		let x = cells[i].x * cellsize;
		let y = cells[i].y * cellsize;
		c.fillRect(x, y, cellsize, cellsize);
	}

	let hl = cells[getCell(highlight.x, highlight.y)];
	if (hl != undefined) {
		c.fillStyle = highlight.color;
		c.fillRect(hl.x*cellsize, hl.y*cellsize, cellsize, cellsize);
	}
}

function getCell(x, y) {
	for (let i=0; i<cells.length; i++) {
		if (cells[i].x==Math.floor(x/cellsize) && cells[i].y==Math.floor(y/cellsize)) {
			return i
		}
	}
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}