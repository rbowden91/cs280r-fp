var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var es = require('./error_suggestions');
var spawn = require('child_process').spawn;

terminal_output = spawn('./esc_seq_cleaner.pl', ['terminal_output']);

process.on('exit', function() {
    terminal_output.kill();
});

var output = "";
terminal_output.stdout.on('data', function (data) {
    output += data;
    io.emit('chat message', es.suggest(output));
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
