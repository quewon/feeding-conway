mouse = {x:undefined,y:undefined,down:false,mode:'place'};

var extract_size = 5;

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
	mouse.down = true;

	if (mouse.mode=='extract') {
		highlight.down = true
	}
};
window.onmouseup = function() {
	if (grid.on) { mouse.down = false }

	if (mouse.x >= 0 && mouse.x <= grid.width && mouse.y >= 0 && mouse.y <= grid.height) {
		if (mouse.mode=='extract') {
			highlight.down = false
			extract()
		}
	} else {
		if (mouse.mode=='extract') {
			highlight.down = false
		}
	}
};

grid.ontouchstart = function() {
	mouse.down = true
};
window.ontouchend = function() {
	mouse.down = false;
	highlight.x = highlight.y = undefined;
};

var highlight = {x:undefined,y:undefined,color:colors.g,down:false};

function gridClick(e) {
	if (mouse.x >= 0 && mouse.x <= grid.width && mouse.y >= 0 && mouse.y <= grid.height) {
		let cell = getCell(mouse.x,mouse.y);
		if (mouse.mode=='set') {
			setCell(cell, behavior_setting);
			behavior[behavior_setting].cells.push(cell);
		}
		else if (mouse.mode=='place' && highlight.down) {
			let hl = cells[cell];

			let s=(extract_size*2)-1;
			let fx = hl.x-extract_size+1;
			let fy = hl.y-extract_size+1;
			
			let i=0, iii=0;
			while (i<s) {
				let ii=0;
				while (ii<s) {
					let color = highlight.down[iii];
					let e = getCell((fx+ii)*cellsize, (fy+i)*cellsize);

					if (color != colors.bg) {
						//find behavior of color
						let bs = Object.keys(behavior);
						bi=0; len=bs.length;
						while (bi<len) {
							let b = behavior[bs[bi]];
							if (color==b.color) {
								console.log(color, b.color);
								setCell(e, bs[bi]);
								b.cells.push(e);
							}
							bi++
						}
					}

					iii++;
					ii++
				}
				i++
			}

			tray.removeChild(tray.querySelector('canvas'));
			if (tray.querySelector('canvas')) {
				highlight.down = tray.querySelector('canvas').celldata;
			} else {
				highlight.down = false;
			}
		}
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

var grid_rect = grid.getBoundingClientRect();

function gridMousemove(e) {
	mouse.x = e.clientX || e.touches[0].clientX;
	mouse.y = e.clientY || e.touches[0].clientY;

	mouse.x = (mouse.x - grid_rect.left) / (grid_rect.right - grid_rect.left) * grid.width;
	mouse.y = (mouse.y - grid_rect.top) / (grid_rect.bottom - grid_rect.top) * grid.height;

	highlight.x = mouse.x;
	highlight.y = mouse.y;

	if (mouse.down && mouse.x >= 0 && mouse.x <= grid.width && mouse.y >= 0 && mouse.y <= grid.height) {
		if (mouse.mode=='set') {
			let cell = getCell(mouse.x,mouse.y);
			setCell(cell, behavior_setting);
			behavior[behavior_setting].cells.push(cell);
		}

		//debug(cell)
	}
}