//scenes
scenes = {};
scenes.current;

function setScene(name) {
	//set the scene
	let s = scenes[name];

	if (scenes[name].title) {
		document.querySelector("title").textContent = scenes[name].title
	}

	//destroy triggers
	TRIGGERS.active = [];
	if ('triggers' in s) {
		TRIGGERS.active = s.triggers;
	}

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