// fill the screen with grey hexes

function fillScreen(){
	canvas.setAttribute('width', getWidth());
	canvas.setAttribute('height', getHeight());
	fillCanvas();
}

window.onresize = fillScreen;

fillScreen();