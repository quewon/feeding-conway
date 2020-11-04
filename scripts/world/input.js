KeyboardController({
	65: function() { moveChar('player', 'x', -1) },
	37: function() { moveChar('player', 'x', -1) },
	68: function() { moveChar('player', 'x', 1) },
	39: function() { moveChar('player', 'x', 1) },
    40: function() { choose(1) },
    38: function() { choose(-1) },
    27: function() { DIALOG.reset() }
}, 100);
//i could implement my own solution here
//but i'd rather move on

function interactChar(name) {
    if (!name) { DIALOG.reset(); return }
    chars[name].interaction();
}

function worldKeypress(k) {
    event.preventDefault();

    if (k===32) {
        if (cursor.index > -1) {
            choose(0)
        } else {
            interactChar(outlined);
        }
    }
    if (k===115) {
        choose(1)
    }
    if (k===119) {
        choose(-1)
    }
}

function choose(dir) {
    let cs = document.getElementsByClassName("choice");

    if (cs.length > 0) {
        if (dir==0) {
            cs[cursor.index].click();
            return
        }

        cursor.index+=dir;

        if (cursor.index<0) { cursor.index = cs.length-1 }
        else if (cursor.index>cs.length-1) { cursor.index = 0 }

        cs[cursor.index].focus();
    }
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
    if (cs && cs[cs.length-1].name=='player' && cs.length > 1) {
        let p = chars.player;

        let x = p.x+1;
        let y = p.y+1;
        let width = (p.vis[2]-1)*2;
        let height = p.vis[3]-2;

        if(chars.player.facing_right) {
        } else {
            x -= p.vis[2];
        }

        //debug
        //bg_context.fillRect(x*ps,y*ps,width*ps,height*ps);

        for (let i=0; i<cs.length-1; i++) {
            let c = chars[cs[i].name];
            let cx = c.x+1;
            let cy = c.y+1;
            let cwidth = c.vis[2]-2;
            let cheight = c.vis[3]-2;

            //bg_context.fillRect(cx*ps,cy*ps,cwidth*ps,cheight*ps);

            if (isColliding(x,y,width,height,cx,cy,cwidth,cheight)) {
                outlined = cs[i].name;
                break
            }
            outlined = undefined
        }

        if (outlined) {
            outlineChar(outlined)
        }
    }
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
    cursor = {x:undefined,y:undefined,index:-1};
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