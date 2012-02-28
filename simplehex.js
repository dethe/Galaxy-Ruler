// Utilities to get window dimensions
window.canvas = document.getElementById('canvas');
window.ctx = canvas.getContext('2d');

function getWidth(){
    var x = 0;
    if (self.innerHeight){
        x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight){
        x = document.documentElement.clientWidth;
    }else if (document.body){
        x = document.body.clientWidth;
    }
    return x;
}

function getHeight(){
    var y = 0;
    if (self.innerHeight){
        y = self.innerHeight;
    }else if (document.documentElement && document.documentElement.clientHeight){
        y = document.documentElement.clientHeight;
    }else if (document.body){
        y = document.body.clientHeight;
    }
    return y;
}

function hex(x,y,radius,stroke,fill){
    if (!stroke){ stroke = '#666'; }
    if (!fill){ fill = '#555'; }
    var degree = Math.PI / 180;
    var points = [0,60,120,180,240,300].map(function(angle){
        return [Math.cos(angle * degree) * radius + x, Math.sin(angle * degree) * radius + y];
    });
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(function(point){
        ctx.lineTo(point[0], point[1]);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function fillCanvas(){
    var size = 50;
    var hcount = getWidth() / (size * 1.5);
    var vcount = getHeight() / (size * 1.8);
    for (var x = 0; x < hcount; x++){
        for (var y = 0; y < vcount; y++){
            if (x % 2){
                hex(x*size*1.6, y*size*1.8,size);
            }else{
                hex(x * size * 1.6, y * size * 1.8 + size * .9, size);
            }
        }
    }
}
