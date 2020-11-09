INTERACT.workstation = function() {
	grid.on = !grid.on;
	if (grid.on) {
		grid.style.display = 'block';
		grid_rect = grid.getBoundingClientRect();
		setScene('lab_grid')
	} else {
		grid.style.display = 'none';
		setScene('lab')
	}
};

createBG('lab', 0, 91, 145, 46, "light", "up");
createChar('workstation', false, 0, 0, 18, 13);
scenes.lab = {
	title: '🧫🧪',
	bg: 'lab',
	chars: [
		{
			name: 'workstation',
			x: 10,
			y: 124
		},
		{
			name: 'player',
			y: 124
		}
	],
};
createBG('lab_grid', 0, 91, 145, 46, "light", "up");
scenes.lab_grid = {
	title: '🧫🧪',
	bg: 'lab_grid',
	chars: [
		{
			name: 'workstation',
			x: 10,
			y: 124
		},
		{
			name: 'player',
			y: 124
		}
	],
};