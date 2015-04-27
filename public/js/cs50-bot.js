$(function() {
    var socket = io();
    $('form').submit(function() {
        //socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    $('body').on('click', '.code-line', function(e) {
        var $this = $(e.target);
        var data = {
            'function': $this.data('function'),
            'filename': $this.data('filename'),
            'line': $this.data('line')
        };
        socket.emit('line', JSON.stringify(data));
        return false;
    });

    socket.on('chat message', function(msg) {
    	msg = msg.replace(/(?:\r\n|\r|\n)/g, '<br />');
        $('#messages').append($('<li>').html(msg));
    });
});
