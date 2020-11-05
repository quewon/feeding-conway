var INTERACT = {};
var DIALOG = {};
var CHOICE = {};

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