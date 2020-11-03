var INTERACT = {};
INTERACT.player = function() {
	printDialog(DIALOG.player)
};
INTERACT.bob = function() {
	printDialog(DIALOG.bob)
};

var DIALOG = {};
var CHOICE = {};
DIALOG.player = "it's you.";
CHOICE.bob = [
	{
		text: "yea",
		effect: function() {
			printDialog(DIALOG.bob2);
			DIALOG.bob[0]++
		}
	},
	{
		text: "nah",
		effect: function() {
			printDialog(DIALOG.bob3);
			DIALOG.bob[0]++
		}
	}
];
DIALOG.bob = [
	1,
	{
		text: "think this train ride's ever gonna end?",
		choice: CHOICE.bob
	},
	{
		text: "say, think that town'll remember ya?"
	}
];
DIALOG.bob2 = "probably right.";
DIALOG.bob3 = "you and me both. at least the scenery's good.";

function printDialog(t) {
	resetDBox();
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
    	printMenu(te.choice);
    } else {
    	t[0]++;
    }
}

function printMenu(c) {
	//i could change this so it doesnt build a span each time this runs and instead puts text into an existing choice box but im gonna move on
	for (let i=0; i<c.length; i++) {
		let div = document.createElement("span"); //whoa! actually not a div!
		div.className = "choice";
		div.innerHTML = c[i].text;
		div.onclick = c[i].effect;
		dialog_box.appendChild(div);
	}
}

var dialog_box = document.getElementById("dialog_box");
function resetDBox() {
	while (dialog_box.lastChild.className=="choice") {
		dialog_box.removeChild(dialog_box.lastChild);
	}

	text.style.display = "none";
}