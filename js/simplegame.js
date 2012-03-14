var socket = io.connect('http://localhost:9999');
 socket.on('news', function (data) {
    //console.log(data);
    login();
    socket.emit('my other event', { my: 'data' });
 });

var degree = Math.PI / 180;

function drawShip(ctx, x, y, color, rot){
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(-(rot * degree));
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(20,0);
	ctx.lineTo(-20,15);
	ctx.lineTo(-5,0);
	ctx.lineTo(-20,-15);
	ctx.closePath();
	ctx.fill();
	if (up_key_down){
		ctx.beginPath();
		ctx.fillStyle = '#F00';
		ctx.moveTo(-5,0);
		ctx.lineTo(-10,-3);
		ctx.lineTo(-18,0);
		ctx.lineTo(-10,3);
		ctx.closePath();
		ctx.fill();
	}
	ctx.restore();
}

function accelerate(){
	momentumX += Math.cos(userShipRotation * degree) * 0.25;
	momentumY -= Math.sin(userShipRotation * degree) * 0.25;
}

// environment

var dialog = null;
var playing = false;
var left_key_down = false;
var right_key_down = false;
var up_key_down = false;


// ship

var userShipColor = '#0F0';
var userShipRotation = 0;
var shipX = 0;
var shipY = 0;
var momentumX = 0;
var momentumY = 0;

// Player
var userName = '';


function login(){
	// Not really logging in, just get a name and a colour for your ship
	var picker = new ui.ColorPicker;
	picker.el.appendTo('#login');
	picker.on('change', function(color){
		userShipColor = color.toString();
	});
	dialog = ui.dialog('Login', $('#login'))
		.closable()
		.show()
		.on('close', function(){
			registerShip();
			dialog=null;
		});
	rotateUserShip();

}

function randint(start, stop){
    // return an integer between start and stop, inclusive
    if (stop === undefined){
        stop = start;
        start = 0;
    }
    var factor = stop - start + 1;
    return Math.floor(Math.random() * factor) + start;
}


function registerShip(){
	// set starting position and begin sending info to server
	shipX = randint(WIDTH);
	shipY = randint(HEIGHT);
	accelerate();
	playing = true;
}

function update(){
	fillCanvas();
	shipX += momentumX;
	shipY += momentumY;
	if (shipX > WIDTH) shipX -= WIDTH;
	if (shipX < 0) shipX += WIDTH;
	if (shipY > HEIGHT) shipY -= HEIGHT;
	if (shipY < 0) shipY += HEIGHT;
	if (playing){
		if (left_key_down) userShipRotation += 2;
		if (right_key_down) userShipRotation -= 2;
		if (up_key_down) accelerate();
		drawShip(ctx, shipX, shipY, userShipColor, userShipRotation );
	}
	setTimeout(update, 30);
}

$(document.body)
	.on('keydown', function(evt){
		//console.log('Key: %s', evt.which);
		if (!playing) return;
		switch(evt.which){
			case 37: // LEFT ARROW (fallthrough)
			case 65: left_key_down = true; break; // A
			case 39: // RIGHT ARROW (fallthrough)
			case 68: right_key_down = true; break; // D
			case 38: // UP arrow (fallthrough)
			case 87: up_key_down = true; break; // W
			case 40: // DOWN arrow
			case 83: // S
			case 32: // SPACE
			case 16: // SHIFT
			default: console.log('Key: %s', evt.which); return;
		}
		return false;
	})
	.on('keyup', function(evt){
		if (!playing) return;
		switch(evt.which){
			case 37:
			case 65: left_key_down = false; break;
			case 39:
			case 68: right_key_down = false; break;
			case 38:
			case 87: up_key_down = false; break;
			default: return;
		}
		return false;
	})

function rotateUserShip(){
	if (!dialog) return;
	var ctx = $('#ship')[0].getContext('2d');
	ctx.fillStyle = '#FFF';
	ctx.fillRect(0,0,45,45);
	drawShip(ctx, 22.5, 22.5, userShipColor, userShipRotation++);
	if (dialog){
		setTimeout(rotateUserShip, 30);
	}
}

update();

