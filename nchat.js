var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = (process.env.PORT || 7878);


app.use(express.static(__dirname + "/public"));

http.listen(port, function(){
	console.log('listening on: ' + port);
});




