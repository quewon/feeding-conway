KeyboardController({
	65: function() { moveChar('player', 'x', -1) },
	37: function() { moveChar('player', 'x', -1) },
	68: function() { moveChar('player', 'x', 1) },
	39: function() { moveChar('player', 'x', 1) },
}, 100);

//i could implement my own solution here
//but i'd rather move on
world.update = function() {
	if (cursor.x && cursor.y) {
        let c = getChar(cursor.x, cursor.y);

        if (c) {
            cursor.char = c;
            outlineChar(c)
        } else {
            cursor.char = undefined
        }
    }
};

function getChar(x, y) {
    let cs = scenes[scenes.current].chars;

    if (cs) {
        for (let i=0; i<cs.length; i++) {
            let c = chars[cs[i].name];
            if (x+1 >= c.x*ps && x+1 <= (c.x+c.vis[2])*ps &&
                y+1 >= c.y*ps && y+1 <= (c.y+c.vis[3])*ps) {
                return cs[i].name;
            }
        }
        cursor.char = undefined
    }
}

world.onclick = function() {
    if (cursor.char) {
        chars[cursor.char].interaction();
    } else {
        resetDBox();
    }
};

var cursor = {x:undefined,y:undefined};
world.onmousemove = function(e) {
    let rect = bg.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;

    x = (x - rect.left) / (rect.right - rect.left) * bg.width;
    y = (y - rect.top) / (rect.bottom - rect.top) * bg.height;

    cursor.x = x-1;
    cursor.y = y-1;
};
world.onmouseout = function() {
    cursor = {x:undefined,y:undefined};
};

//https://stackoverflow.com/a/3691661/9375514
function KeyboardController(keys, repeat) {
    var timers = {};

    document.onkeydown= function(e) {
        if (world.on) {
            var key = e.keyCode || e.which;
            if (!(key in keys))
                return true;
            if (!(key in timers)) {
                timers[key] = null;
                keys[key]();
                timers[key] = setInterval(keys[key], repeat);
            }
            return false;
        }
    };

    document.onkeyup= function(e) {
        if (world.on) {
            var key = e.keyCode || e.which;
            if (key in timers) {
                if (timers[key]!==null)
                    clearInterval(timers[key]);
                delete timers[key];
            }
            stopChars()
        }
    };

    window.onblur= function() {
        if (world.on) {
            for (key in timers)
                if (timers[key]!==null)
                    clearInterval(timers[key]);
            timers = {};
            stopChars()
        }
    };
};