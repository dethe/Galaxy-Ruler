// fill the screen with grey hexes
function draw_resize(){
	canvas.setAttribute('width', getWidth());
    canvas.setAttribute('height', getHeight());
    fillCanvas();
}
draw_resize();
fillCanvas();
window.onresize = draw_resize;