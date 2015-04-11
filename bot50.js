#!/usr/bin/nodejs

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var es = require('./error_suggestions');
var fs = require('fs');
var spawn = require('child_process').spawn;
var execSync = require('execsync');


terminal_output = spawn('cat', ['terminal_output']);

process.on('exit', function() {
    terminal_output.kill();
});


var output = "";
terminal_output.stdout.on('data', function (data) {
    output += data;

    // TODO: somehow make esc_seq_cleaner.pl a javascript regex
    fs.writeFileSync('tmp_colored_output', output);
    output = execSync("./esc_seq_cleaner.pl tmp_colored_output");

    while ((idx = output.indexOf("jharvard@appliance (", 1)) !== -1) {
    	// contains everything in between the first and next bash prompts
    	var this_output = output.substring(0, idx);

    	// update "output" to the start of the next bash prompt
    	output = output.substring(idx);
	var response = es.suggest(this_output);
	if (response !== false) {
	    io.emit('chat message', response);
	}
    }

});

terminal_output.stderr.on('data', function (data) {
    // possible?
});

terminal_output.on('close', function (code) {
    console.log('child process exited with code ' + code);
});

app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
