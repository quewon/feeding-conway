var INTERACT = {};
INTERACT.player = function() {
	DIALOG.print(DIALOG.player)
};
INTERACT.bob = function() {
	DIALOG.print(DIALOG.bob)
};
INTERACT.elevator = function() {
	if (scenes.current.includes('station_ext')) {
		playCharAnimation('elevator', function() {
			setScene('station_ext_pre_elevator');
		});
	} else {
		playCharAnimation('elevator', function() {
			setScene('station_stairs_pre_elevator');
		});
	}
};
INTERACT.train_sign = function() {
	DIALOG.print(DIALOG.train_sign)
}
INTERACT.station_sign = function() {
	DIALOG.print(DIALOG.station_sign)
};

var DIALOG = {};
var CHOICE = {};
DIALOG.player = "👩‍🔬💭💡";
CHOICE.bob = [
	{
		text: "👋👋",
		effect: function() {
			DIALOG.print(DIALOG.bob2);
			DIALOG.bob[0]++;
			setTimeout(function() {
				document.getElementById("controls").style.display = "none";
				world.classList.remove('screenshake');
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
				document.getElementById("controls").style.display = "none";
				world.classList.remove('screenshake');
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

//functions
DIALOG.print = function(t) {
	DIALOG.reset();
    text.style.display = "block";

	if (typeof t === "string") {
		text.innerHTML = t;
		return
	}

    if (t[0] > t.length-1) {
    	te = t[t.length-1];
    } else {
    	te = t[t[0]];
    }

    text.innerHTML = te.text;
    if ('choice' in te) {
    	//only move on if choie has been made
    	DIALOG.printMenu(te.choice);
    } else {
    	t[0]++;
    }
}

DIALOG.printMenu = function(c) {
	//i could change this so it doesnt build a span each time this runs and instead puts text into an existing choice box but im gonna move on
	for (let i=0; i<c.length; i++) {
		let div = document.createElement("span"); //whoa! actually not a div!
		div.className = "choice";
		div.innerHTML = c[i].text;
		div.onclick = c[i].effect;
		div.tabIndex = "1";
		dialog_box.appendChild(div);
	}
}

var dialog_box = document.getElementById("dialog_box");
DIALOG.reset = function() {
	while (dialog_box.lastChild.className=="choice") {
		dialog_box.removeChild(dialog_box.lastChild);
	}

	text.style.display = "none";
	cursor.index = -1;
}