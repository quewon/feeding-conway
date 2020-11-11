//DIALOG AND INTERACTIONS
INTERACT.player = function() {
	DIALOG.print(DIALOG.player);
	if (scenes.current=='train_light') {
		if (controls.style.display=="block") {
			scenes.train_light.bgsbg = 'train_cars_light_no_title';
			controls.style.display = "none";
		}
	}
};
INTERACT.bob = function() {
	DIALOG.print(DIALOG.bob);
	if (controls.style.display=="block") {
		scenes.train_light.bgsbg = 'train_cars_light_no_title';
		controls.style.display = "none";
	}
};
INTERACT.train_sign = function() {
	DIALOG.print(DIALOG.train_sign)
}
INTERACT.station_sign = function() {
	DIALOG.print(DIALOG.station_sign)
};

DIALOG.player = "👩‍🔬💭💡";
CHOICE.bob = [
	{
		text: "👋👋",
		effect: function() {
			DIALOG.print(DIALOG.bob2);
			DIALOG.bob[0]++;
			setTimeout(function() {
				document.getElementById("world").classList.remove('screenshake');
				setScene('train_station1')
			},5000)
		}
	},
	{
		text: "🚆=🥱",
		effect: function() {
			DIALOG.print(DIALOG.bob3);
			DIALOG.bob[0]++;
			setTimeout(function() {
				document.getElementById("world").classList.remove('screenshake');
				setScene('train_station1')
			},5000)
		}
	}
];
DIALOG.bob = [
	1,
	{
		text: "❔",
		choice: CHOICE.bob
	},
	{
		text: "💤"
	}
];
DIALOG.bob2 = "👋";
DIALOG.bob3 = "🚆=😴✅";
DIALOG.train_sign = "🕘🚆⌛";
DIALOG.station_sign = "⬆️🚪🚶";

// SCENES
createChar('player');
//createPX('train_cars', 0);
createBG('train_car', 44, 58, 68, 21);
createFG('train_car_fg');
createPX('light', 5);
createPX('train_cars_light', 0);
createPX('train_cars_light_no_title', 0);
createChar('bob');
var controls = document.getElementById("controls");
scenes.train_light = {
	title: '🚆',
	parallax: 'light',
	bg: 'train_car',
	bgsbg: 'train_cars_light',
	fg: 'train_car_fg',
	chars: [
			{
				name: 'bob',
				x: 47,
				y: 68
			},
			{
				name: 'player',
				x: 65,
				y: 68
			}
	],
	extras: function() {
		document.getElementById("world").classList.add('screenshake');
		controls.style.display = "block";
	}
};

createBG('train_station1', 0, 0, 145, 46, "dark", 'down');
createBG('train_station2', 0, 0, 145, 46, "dark", 'down');
createBG('train_station3', 0, 0, 145, 46, "dark", 'down');
createFG('train_station3_fg');
createChar('train_sign', false, 0, 0, 16, 8, true);
scenes.train_station1 = {
	bg: 'train_station1',
	extras: function() {
		setTimeout(function() {
			setScene('train_station2')
		},1000)
	}
};
scenes.train_station2 = {
	bg: 'train_station2',
	extras: function() {
		setTimeout(function() {
			setScene('train_station_with_bob')
		},1000)
	}
};
scenes.train_station_with_bob = {
	title: '🚉',
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
		[-1,function(){setScene('station_stairs_right')},[]]
	]
};
scenes.train_station = {
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
		[-1,function(){setScene('station_stairs_right')},[]]
	]
}

createBG('station_stairs', 0, 0, 154, 46, "dark", 'down');
createDoor('elevator', 0, 0, 16, 25);
createChar('station_sign', false, 0, 0, 16, 5, true);
scenes.station_stairs_right = {
	bg: 'station_stairs',
	chars: [
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
	doors: [
		{
			name: 'elevator',
			destination: 'elevator_down1',
			x: 16,
			y: 10
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
		[155,function(){setScene('train_station')},[]]
	]
};
createBG('station_stairs_left', 0, 0, 154, 46, "dark", 'down');
scenes.station_stairs_left = {
	bg: 'station_stairs_left',
	fg: 'station_stairs_fg',
	chars: [
		{
			name: 'station_sign',
			x: 46,
			y: 5
		},
		{
			name: 'player',
			x: 20,
			y: 24,
			dir: 'right'
		}
	],
	doors: [
		{
			name: 'elevator',
			destination: 'elevator_down1',
			x: 16,
			y: 10
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
		[155,function(){setScene('train_station')},[]]
	],
	extras: function() {
		closeDoor(available_door)
	}
};

createBG('elevator1', 8, 12, 23, 24, 'dark', 'down');
createBG('elevator2', 8, 66, 23, 24, 'dark', 'up');
scenes.elevator_down1 = {
	bg: 'elevator1',
	chars: [
		{
			name: 'player',
			y:24
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
			y: 78
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('station_ext_left')
		}, 1000)
	}
};
scenes.elevator_up1 = {
	bg: 'elevator1',
	chars: [
		{
			name: 'player',
			y: 24
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('station_stairs_left')
		}, 1000)
	}
};
scenes.elevator_up2 = {
	bg: 'elevator2',
	chars: [
		{
			name: 'player',
			y: 78
		}
	],
	extras: function() {
		setTimeout(function() {
			setScene('elevator_up1')
		}, 1000)
	}
};

createBG('station_ext', 0, 0, 154, 46, "light", 'up');
createBG('station_ext_left', 0, 0, 154, 46, "light", 'up');
scenes.station_ext_left = {
	bg: 'station_ext_left',
	chars: [
		{
			name: 'player',
			x:20,
			y:78
		},
	],
	doors: [
		{
			name: 'elevator',
			destination: 'elevator_up2',
			x: 16,
			y: 64
		}
	],
	triggers: [
		[48,TRIGGERS.stair_left,[]],
	]
};
scenes.station_ext_right = {
	title: '🚉',
	bg: 'station_ext',
	chars: [
		{
			name: 'player',
			y:78
		}
	],
	doors: [
		{
			name: 'elevator_inside',
			destination: 'elevator_up2',
			x: 15,
			y: 66
		}
	],
	triggers: [
		[48,TRIGGERS.stair_left,[]],
	]
};