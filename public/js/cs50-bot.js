$(function() {
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
    	msg = msg.replace(/(?:\r\n|\r|\n)/g, '<br />');
        $('#messages').append($('<li>').html(msg));
    });
});
