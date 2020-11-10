INTERACT.workstation = function() {
	grid.on = !grid.on;
	if (grid.on) {
		tray.style.display = "block";
		grid.style.display = 'block';
		grid_rect = grid.getBoundingClientRect();
	} else {
		grid.style.display = 'none';
		tray.style.display = "none";
	}
};
INTERACT.toolbox = function() {
	if (scenes.current=='lab_toolbox') {
		setScene('lab')
	} else {
		setScene('lab_toolbox')
	}
};
INTERACT.dropper = function() {
	mouse.mode = 'set';
};
INTERACT.extractor = function() {
	mouse.mode = 'extract';
};

createBG('lab', 0, 91, 145, 46, "light", "up");
createChar('workstation', false, 0, 0, 18, 13);
createChar('toolbox', false, 0, 0, 10, 7);
scenes.lab = {
	title: '🧫🧪',
	bg: 'lab',
	chars: [
		{
			name: 'workstation',
			x: 70,
			y: 124
		},
		{
			name: 'toolbox',
			x: 59,
			y: 131
		},
		{
			name: 'player',
			y: 124
		}
	]
};
createBG('lab_toolbox', 0, 91, 145, 46, "light", "up");
createChar('dropper', false, 0, 0, 7, 14);
createChar('extractor', false, 0, 0, 14, 10);
scenes.lab_toolbox = {
	title: '🧫🧪',
	bg: 'lab_toolbox',
	chars: [
		{
			name: 'dropper',
			x: 119,
			y: 3
		},
		{
			name: 'extractor',
			x: 125,
			y: 3
		},
		{
			name: 'workstation'
		},
		{
			name: 'toolbox'
		},
		{
			name: 'player'
		}
	]
};