KeyboardController({
	65: function() { moveChar('player', 'x', -1) },
	37: function() { moveChar('player', 'x', -1) },
	68: function() { moveChar('player', 'x', 1) },
	39: function() { moveChar('player', 'x', 1) },
    27: function() { DIALOG.reset() }
}, 100);
//i could implement my own solution here
//but i'd rather move on

function worldKeyup(k) {
    if (k===87 || k===38) {
        openDoor(available_door)
    }
}

function interactChar(name) {
    if (!name) { DIALOG.reset(); return }
    chars[name].interaction();
}

function isColliding(x1, y1, width1, height1, x2, y2, width2, height2) {
    if (
        (x2+1>x1 && x2<x1+width1 && y2+1>=y1 && y2<=y1+height1) ||
        (x2+width2>x1 && x2+width2<x1+width1 && y2+height2>=y1 && y2+height2<=y1+height1)
        )
    {
        return true
    }
    return false
}

world.update = function() {
    let cs = scenes[scenes.current].chars;
	if (cursor.x && cursor.y) {
        let c = getChar(cursor.x, cursor.y);

        if (c) {
            cursor.char = c;
            outlineChar(c)
        } else {
            cursor.char = undefined;
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
    }
    return undefined
}

world.onclick = function() {
    if (cursor.char) {
        interactChar(cursor.char)
    } else if (outlined) {
        interactChar(outlined)
    } else {
        DIALOG.reset();
    }
};

var cursor = {x:undefined,y:undefined,index:-1};
var world_rect = bg.getBoundingClientRect();
function worldMousemove(e) {
    let x = e.clientX;
    let y = e.clientY;

    x = (x - world_rect.left) / (world_rect.right - world_rect.left) * bg.width;
    y = (y - world_rect.top) / (world_rect.bottom - world_rect.top) * bg.height;

    cursor.x = x-1;
    cursor.y = y-1;
}

function worldMouseout(e) {
    cursor = {x:undefined,y:undefined,index:-1};
}

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