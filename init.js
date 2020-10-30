var cellsize = 10;
//number of chunks on axis (there are chunks^2 chunks)
var chunks = 8;

colors = {};
colors.bg = '#303030';
colors.a = '#4d4d4d';
colors.b = '#ee6a7c';
colors.c = '#ffa7a5'; //lazy
colors.d = '#ffe07e';
colors.e = '#72dcbb'; //firey
colors.f = '#34acba';
colors.g = '#ffe7d6';

document.body.style.backgroundColor = colors.bg;
canvas.style.border = cellsize+'px solid '+colors.a;
document.querySelector("div").style.border = cellsize+'px solid '+colors.a;
document.body.style.color = colors.g;
document.querySelector("div").onclick = function() {
	document.querySelector("div").style.display = 'none';
	canvas.style.display = 'block'
}