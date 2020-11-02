//scenes
scenes = {};
scenes.current;
scenes.train = {
	bg: 'train_car',
	fg: 'train_car_fg',
	chars: [
			{
				name: 'player',
				x: 66,
				y: 66
			}
	],
	class: 'screenshake'
};

function setScene(name) {
	//refresh scene (remove all other stuff)

	//set the scene
	let s = scenes[name];

	setBG(s.bg);

	for (let i=0; i<s.chars.length; i++) {
		let c = s.chars[i];
		setChar(c.name, c.x, c.y)
	}

	if (s.class) {
		world.className += s.class;
	}

	scenes.current = name;
}