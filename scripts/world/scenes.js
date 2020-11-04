//scenes
scenes = {};
scenes.current;

createChar('player');
createPX('train_cars', 0);
createBG('train_car', 44, 58, 68, 21);
createFG('train_car_fg');
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

createPX('title', 0);
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

createPX('light', 5);
createPX('train_cars_light', 0);
createChar('bob');
scenes.train_light = {
	parallax: 'light',
	bg: 'train_car',
	bgsbg: 'train_cars_light',
	fg: 'train_car_fg',
	chars: [
			{
				name: 'bob',
				x: 47,
				y: 68,
				//dir: 'left'
			},
			{
				name: 'player',
				x: 65,
				y: 68
			}
	],
	extras: function() {
		world.classList.add('screenshake');
	}
};


scenes.train_station = {

};

createBG('station_stairs', 0, 45, 154, 46, "#4e5c67");
createFG('station_stairs_fg');
createChar('elevator', false, 0, 0, 16, 25, true);
createChar('station_sign', false, 0, 0, 16, 5, true);
scenes.train_stairs = {
	bg: 'station_stairs',
	fg: 'station_stairs_fg',
	chars: [
		{
			name: 'elevator',
			x: 15,
			y: 57
		},
		{
			name: 'station_sign',
			x: 46,
			y: 50
		},
		{
			name: 'player',
			x: 147,
			y: 79,
			dir: 'left'
		}
	],
	triggers: [
		[80,TRIGGERS.stair_left,[]],
		[75,TRIGGERS.stair_left,[]],
		[70,TRIGGERS.stair_left,[]],
		[65,TRIGGERS.stair_left,[]],
		[60,TRIGGERS.stair_left,[]],
		[55,TRIGGERS.stair_left,[]],
		[50,TRIGGERS.stair_left,[]],
		[45,TRIGGERS.stair_left,[]],
		[40,TRIGGERS.stair_left,[]],
		[35,TRIGGERS.stair_left,[]],
		[149,function(){setScene('train_station')},[]]
	]
};

createBG('pre_elevator', 0, 45, 154, 46, "#4e5c67");
createFG('pre_elevator_fg');
scenes.pre_elevator = {
	bg: 'pre_elevator',
	fg: 'pre_elevator_fg',
	chars: [
		{
			name: 'station_sign'
		},
		{
			name: 'player'
		}
	],
	triggers: [
		[80,TRIGGERS.stair_left,[]],
		[75,TRIGGERS.stair_left,[]],
		[70,TRIGGERS.stair_left,[]],
		[65,TRIGGERS.stair_left,[]],
		[60,TRIGGERS.stair_left,[]],
		[55,TRIGGERS.stair_left,[]],
		[50,TRIGGERS.stair_left,[]],
		[45,TRIGGERS.stair_left,[]],
		[40,TRIGGERS.stair_left,[]],
		[35,TRIGGERS.stair_left,[]],
		[149,function(){setScene('train_station')},[]],
		[17,function(){setScene('elevator')},[]]
	],
}

createBG('elevator');
scenes.elevator = {
	bg: 'elevator',
	chars: [
		{
			name: 'player'
		}
	],
	extras: function() {

	}
};

function setScene(name) {
	console.log("scene: "+name);

	//set the scene
	let s = scenes[name];

	//destroy triggers
	TRIGGERS.active = [];
	TRIGGERS.active = s.triggers;

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

	DIALOG.reset();
}