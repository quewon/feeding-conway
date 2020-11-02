createPX('light', 5);
createPX('title', 0);
createPX('train_cars', 0);
createBG('train_car', 44, 58, 68, 21, 'train_cars');
createChar('player', "it's you.");
createFG('train_car_fg');
//i could put translucent white on the foreground to simulate lighting

//scenes
scenes = {};
scenes.current;
scenes.train_dark = {
	bg: 'train_car',
	fg: 'train_car_fg',
	chars: [
			{
				name: 'player',
				x: 66,
				y: 66
			}
	],
	extras: function() {
		world.className += 'screenshake';

		setTimeout(function() {
			setScene('train_brief')
		}, 3000)
	}
};
scenes.train_brief = {
	parallax: 'title',
	extras: function() {
		setTimeout(function() {
			document.body.style.backgroundColor = "#ebf2e7";
		}, 1500)
		setTimeout(function() {
			setScene('train_light');
		}, 3000)
	}
};
scenes.train_light = {
	parallax: 'light',
	bg: 'train_car',
	fg: 'train_car_fg',
	chars: [
			{
				name: 'player'
			}
	]
};

function setScene(name) {
	console.log("scene: "+name);

	text.style.display = 'none';

	//set the scene
	let s = scenes[name];

	setBG(s.bg);

	if (s.chars) {
		for (let i=0; i<s.chars.length; i++) {
			let c = s.chars[i];
			if (c.x && c.y) {
				setChar(c.name, c.x, c.y)
			}
		}
	}

	if (s.extras) { s.extras() }

	scenes.current = name;
}