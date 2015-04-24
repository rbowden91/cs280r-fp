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

var publisher = require('redis').createClient();
var subscriber = require('redis').createClient();

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

    var responded = false;
    while ((idx = output.indexOf("jharvard@appliance (", 1)) !== -1) {
    	// contains everything in between the first and next bash prompts
    	var this_output = output.substring(0, idx);

    	// update "output" to the start of the next bash prompt
    	output = output.substring(idx);
	var response = es.suggest(this_output);
	if (response !== false) {
	    io.emit('chat message', response);
	    responded = true;
	}
    }

    // trigger gedit to return to us all unsaved files, in case the
    // user simply forgot to save
    if (responded === true) {
	publisher.publish('get_unsaved', 'true');
    }

});

terminal_output.stderr.on('data', function (data) {
    // possible?
});

terminal_output.on('close', function (code) {
    console.log('child process exited with code ' + code);
});

subscriber.subscribe('unsaved');
subscriber.on('message', function(channel, data) {
    io.emit('unsaved', data);
});

io.on('connection', function(socket){
  socket.on('line', function(msg){
    //io.emit('line', msg);
    publisher.publish('line', msg);
  });
});

app.use(express.static('public'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});
