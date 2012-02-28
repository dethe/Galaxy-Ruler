// This is the core of the Galaxy Ruler server (or will be, maybe, perhaps)

var http = require('http'),
    socketio = require('socket.io'),
    url = require("url"),
    path = require("path"),
    fs = require('fs'),
    getip = require('lib/get_ip');

var port = 9999;

getip.getNetworkIP(function(err, ip){
	console.log('Running server at http://' + ip + ':' + port + '/, come join in!')
});

// Static file server
var app = http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

	if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
})
app.listen(port);

var io = socketio.listen(app);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

