mouse = {x:0,y:0,down:false};

canvas.onmousedown = function() { mouse.down = true };
window.onmouseup = function() { mouse.down = false };

var highlight = {x:undefined,y:undefined,color:colors.g};
window.onmousemove = function(e) {
	let rect = canvas.getBoundingClientRect();

	mouse.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
	mouse.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

	highlight.x = mouse.x;
	highlight.y = mouse.y;

	if (mouse.down && mouse.x >= 0 && mouse.x <= canvas.width && mouse.y >= 0 && mouse.y <= canvas.height) {
		let cell = getCell(mouse.x,mouse.y);
		setCell(cell, behavior_setting);
		behavior[behavior_setting].cells.push(cell);

		//debug(cell)
	}
};

window.onclick = function(e) {
	if (mouse.x >= 0 && mouse.x <= canvas.width && mouse.y >= 0 && mouse.y <= canvas.height) {
		let cell = getCell(mouse.x,mouse.y);
		setCell(cell, behavior_setting);
		behavior[behavior_setting].cells.push(cell);

		//debug(cell)
	}
}

window.addEventListener("keypress", function(e) {
	let k = event.keyCode || event.which;

	if (k===32) {
		event.preventDefault();
		updating = !updating;
	}
});

function debug(cell) {
	let cs = surrounding(cell);
	console.log(cell, cs);
	for (i=0; i<cs.length; i++) { cells[cs[i]].color = getRandomColor(); }
}