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

createBG('train_station1', 0, 0, 145, 46, "dark", 'down');
createBG('train_station2', 0, 0, 145, 46, "dark", 'down');
createBG('train_station3', 0, 0, 145, 46, "dark", 'down');
createFG('train_station3_fg');
createChar('train_sign', false, 0, 0, 16, 7, true);
scenes.train_station = {
	bg: 'train_station1',
	extras: function() {
		world.classList.remove('screenshake');
		setTimeout(function() {
			setScene('train_station2')
		},1000)
	}
};
scenes.train_station2 = {
	bg: 'train_station2',
	extras: function() {
		setTimeout(function() {
			setScene('train_station3')
		},1000)
	}
};
scenes.train_station3 = {
	bg: 'train_station3',
	fg: 'train_station3_fg',
	chars: [
		{
			name: 'train_sign',
			x: 85,
			y: 8
		},
		{
			name: 'bob',
			x: 136,
			y: 34,
			dir: 'left'
		},
		{
			name: 'player',
			x: 120,
			y: 34,
			dir: 'left'
		}
	],
	triggers: [
		[-1,function(){setScene('station_stairs')},[]]
	]
};
scenes.train_station4 = {
	bg: 'train_station3',
	fg: 'train_station3_fg',
	chars: [
		{
			name: 'train_sign',
			x: 85,
			y: 8
		},
		{
			name: 'player',
			x: -2,
			y: 34
		}
	],
	triggers: [
		[-1,function(){setScene('station_stairs')},[]]
	]
}

createBG('station_stairs', 0, 0, 154, 46, "dark", 'down');
createFG('station_stairs_fg');
createChar('elevator', false, 0, 0, 16, 25, true);
createChar('station_sign', false, 0, 0, 16, 5, true);
scenes.station_stairs = {
	bg: 'station_stairs',
	fg: 'station_stairs_fg',
	chars: [
		{
			name: 'elevator',
			x: 15,
			y: 12
		},
		{
			name: 'station_sign',
			x: 46,
			y: 5
		},
		{
			name: 'player',
			x: 147,
			y: 34,
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
		[155,function(){setScene('train_station4')},[]]
	]
};

createBG('pre_elevator', 0, 0, 154, 46, 'dark', 'down');
scenes.pre_elevator = {
	bg: 'pre_elevator',
	fg: 'station_stairs_fg',
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
		[17,function(){setScene('elevator_down1')},[]]
	],
};

createBG('elevator1', 8, 12, 23, 24, 'dark', 'down');
createBG('elevator2', 8, 40, 23, 24, 'dark', 'down');
createBG('elevator3', 8, 67, 23, 24, 'dark', 'up');
scenes.elevator_down1 = {
	bg: 'elevator1',
	chars: [
		{
			name: 'player'
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('elevator_down2')
		}, 1000)
	}
};
scenes.elevator_down2 = {
	bg: 'elevator2',
	chars: [
		{
			name: 'player',
			y: 52
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('elevator_down3')
		}, 1000)
	}
};
scenes.elevator_down3 = {
	bg: 'elevator3',
	chars: [
		{
			name: 'player',
			y: 79
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('station_ext')
		}, 1000)
	}
};
scenes.elevator_up1 = {
	bg: 'elevator1',
	chars: [
		{
			name: 'player',
			y: 34
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('pre_elevator')
		}, 1000)
	}
};
scenes.elevator_up2 = {
	bg: 'elevator2',
	chars: [
		{
			name: 'player',
			y: 52
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('elevator_up1')
		}, 1000)
	}
};
scenes.elevator_up3 = {
	bg: 'elevator3',
	chars: [
		{
			name: 'player',
			y: 79
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('elevator_up2')
		}, 1000)
	}
};

scenes.station_ext = {

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