var canvas = document.querySelector('canvas');
canvas.width = parseFloat(getComputedStyle(document.body).getPropertyValue('--size'));
canvas.height = canvas.width;

// DRAWING
var c = canvas.getContext('2d');

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	drawGrid();
}