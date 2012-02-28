// fill the screen with grey hexes
window.onresize = function(){
	canvas.setAttribute('width', getWidth());
    canvas.setAttribute('height', getHeight());
    fillCanvas();
}

fillCanvas();
