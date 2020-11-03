var INTERACT = {};
INTERACT.player = function() {
	printDialog(DIALOG.player)
};
INTERACT.bob = function() {
	printMenu(DIALOG.bob, CHOICE.bob)
};

var DIALOG = {};
var CHOICE = {};
DIALOG.player = "it's you.";
DIALOG.bob = `WOW HI`;
CHOICE.bob = [
	{
		text: "yea",
		effect: function() {
			printDialog(DIALOG.bob2)
		}
	},
	{
		text: "nah",
		effect: function() {
			printDialog(DIALOG.bob3)
		}
	}
];
DIALOG.bob2 = "yeah?";
DIALOG.bob3 = "nah?";

function printDialog(t) {
	resetDBox();
    text.style.display = "block";
    text.innerHTML = t;
}

function printMenu(t, c) {
	printDialog(t);

	for (let i=0; i<c.length; i++) {
		printChoice(c[i])
	}

	//i could change this so it doesnt build a span each time this runs and instead puts text into an existing choice box but im gonna move on
	function printChoice(t) {
		let div = document.createElement("span"); //whoa! actually not a div!
		div.className = "choice";
		div.innerHTML = t.text;
		div.onclick = t.effect;
		text.parentElement.appendChild(div);
	}
}

var dialog_box = document.getElementById("dialog_box");
function resetDBox() {
	while (dialog_box.lastChild.className=="choice") {
		dialog_box.removeChild(dialog_box.lastChild);
	}

	text.style.display = "none";
}