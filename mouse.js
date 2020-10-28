var behavior_setting = 'lazy';

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
		setCell(getCell(mouse.x, mouse.y), behavior_setting);
		behavior[behavior_setting].cells.push(getCell(mouse.x, mouse.y));
	}
};