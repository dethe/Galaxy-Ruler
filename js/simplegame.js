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
	ctx.restore();
}

function accelerate(){
	momentumX += Math.cos(userShipRotation * degree);
	momentumY -= Math.sin(userShipRotation * degree);
}

var userShipColor = '#0F0';
var userName = 'Somewhat Peeved Max';
var userShipRotation = 0;
var dialog = null;
var shipX = 0;
var shipY = 0;
var playing = false;
var momentumX = 0;
var momentumY = 0;

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
		drawShip(ctx, shipX, shipY, userShipColor, userShipRotation );
	}
	setTimeout(update, 30);
}

$(document.body)
	.on('keydown', function(evt){
		//console.log('Key: %s', evt.which);
		if (dialog) return;
		switch(evt.which){
			case 37: userShipRotation += 6; break; // LEFT ARROW
			case 39: userShipRotation -= 6; break; // RIGHT ARROW
			case 38: accelerate(); break;// UP arrow
			case 40: // DOWN arrow
			case 87: accelerate(); break;// W
			case 83: // S
			case 65: userShipRotation += 6; break; // A
			case 68: userShipRotation -= 6; break; // D
			case 32: // SPACE
			case 16: // SHIFT
			default: console.log('Key: %s', evt.which); return;
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

