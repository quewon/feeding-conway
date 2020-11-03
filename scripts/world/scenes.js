createPX('light', 5);
createPX('title', 0);
createPX('train_cars', 0);
createPX('train_cars_light', 0);
createBG('train_car', 44, 58, 68, 21);
createFG('train_car_fg');
//i could put translucent white on the foreground to simulate lighting

createChar('player');
createChar('bob');

//scenes
scenes = {};
scenes.current;
scenes.train_dark = {
	bg: 'train_car',
	bgsbg: 'train_cars',
	fg: 'train_car_fg',
	chars: [
			{
				name: 'player',
				x: 66,
				y: 66
			}
	],
	extras: function() {
		document.body.style.backgroundColor = "#4e5c67";
		world.classList.add('screenshake');

		setTimeout(function() {
			setScene('title_screen')
		}, 3000)
	}
};
scenes.title_screen = {
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
	bgsbg: 'train_cars_light',
	fg: 'train_car_fg',
	chars: [
			{
				name: 'bob',
				x: 48,
				y: 66,
				//dir: 'left'
			},
			{
				name: 'player',
				x: 66,
				y: 66
			}
	],
	extras: function() {
		world.classList.add('screenshake');
	}
};

function setScene(name) {
	console.log("scene: "+name);

	text.style.display = 'none';

	//set the scene
	let s = scenes[name];

	if (s.bg) {
		setBG(s.bg);
	}

	if (s.chars) {
		for (let i=0; i<s.chars.length; i++) {
			let c = s.chars[i];
			c.dir = c.dir || null;
			c.x = c.x || null;
			c.y = c.y || null;
			setChar(c.name, c.x, c.y, c.dir)
		}
	}

	if (s.extras) { s.extras() }

	scenes.current = name;
}