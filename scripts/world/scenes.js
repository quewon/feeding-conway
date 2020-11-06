//scenes
scenes = {};
scenes.current;

function setScene(name) {
	//set the scene
	let s = scenes[name];

	DIALOG.reset();

	if ('title' in s) {
		document.querySelector("title").textContent = scenes[name].title
	}

	//destroy triggers
	TRIGGERS.active = [];
	if ('triggers' in s) {
		TRIGGERS.active = s.triggers;
	}

	if ('bg' in s) {
		setBG(s.bg);
	}

	if ('chars' in s) {
		for (let i=0; i<s.chars.length; i++) {
			let c = s.chars[i];
			c.dir = c.dir || null;
			c.x = c.x || null;
			c.y = c.y || null;
			setChar(c.name, c.x, c.y, c.dir)
		}
	}

	scenes.current = name;

	//check for doors
	if ('doors' in scenes[scenes.current]) {
		let ds = scenes[scenes.current].doors;
		let x = chars.player.x;
		let dx, dy;
		for (let i=0; i<ds.length; i++) {
			available_door = undefined;
			if (x>=ds[i].x-1 && x<=ds[i].x+doors[ds[i].name].vis[2]-2) {
				available_door = i;
				dx = (ds[i].x+doors[ds[i].name].vis[2]/2)*ps-door_icon.width/2;
				dy = (ds[i].y-1)*ps-door_icon.height;
				break
			}
		}
		if (available_door!=undefined) {
			door_icon.style.display = "block";
			door_icon.style.left = "calc(50% - var(--world-width) * 0.5 + "+dx+"px)";
			door_icon.style.top = "calc(50% - var(--world-height) * 0.5 + "+dy+"px)";
		} else {
			door_icon.style.display = "none";
		}
	} else {
		door_icon.style.display = "none";
	}

	if ('extras' in s) { s.extras() }
}