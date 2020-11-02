KeyboardController({
	65: function() { moveChar('player', 'x', -1) },
	37: function() { moveChar('player', 'x', -1) },
	68: function() { moveChar('player', 'x', 1) },
	39: function() { moveChar('player', 'x', 1) },
}, 100);

//i could implement my own solution here
//but i'd rather move on
world.update = function() {
	
}

//https://stackoverflow.com/a/3691661/9375514
function KeyboardController(keys, repeat) {
    var timers = {};

    document.onkeydown= function(e) {
        var key = e.keyCode || e.which;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key] = null;
            keys[key]();
            timers[key] = setInterval(keys[key], repeat);
        }
        return false;
    };

    document.onkeyup= function(e) {
        var key = e.keyCode || e.which;
        if (key in timers) {
            if (timers[key]!==null)
                clearInterval(timers[key]);
            delete timers[key];
        }
        stopChars()
    };

    window.onblur= function() {
        for (key in timers)
            if (timers[key]!==null)
                clearInterval(timers[key]);
        timers = {};
        stopChars()
    };
};