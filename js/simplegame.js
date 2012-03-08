var socket = io.connect('http://localhost:9999');
 socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
 });

var degree = Math.PI / 180;

function drawShip(color, pos, rot){
	ctx.save();
	ctx.translate(pos.x, pos.y);
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

