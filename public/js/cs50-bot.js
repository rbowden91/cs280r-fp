$(function() {
    var socket = io();
    $('form').submit(function() {
        //socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    $('body').on('click', '.code-line', function(e) {
        var $this = $(e.target).closest('a');
        var data = {
            'char': $this.data('char'),
            'filename': $this.data('filename'),
            'line': $this.data('line')
        };
        socket.emit('line', JSON.stringify(data));
        return false;
    });

    socket.on('unsaved', function(data) {
    	unsaved = JSON.parse(data).unsaved;

	// TODO: only add this message if the unsaved files are relevant?
	var msg = 'Be careful! The file';
	msg += unsaved.length > 1 ? 's' : '';
	msg += ' ' + unsaved.join(', ');
	msg += unsaved.length > 1 ? ' are' : ' is';
	msg += ' unsaved in gedit!';

        $new_message = $('<li>').html(msg);
        $new_message.addClass('new');

        // add the new message to the page
        $('#messages').append($new_message);

        // go to the bottom of the window
        window.scrollTo(0,document.body.scrollHeight);
    });

    socket.on('chat message', function(msg) {
    	msg = msg.replace(/(?:\r\n|\r|\n)/g, '<br />');

        // if the "No messages" div is there, remove it
        $('.empty').remove();

        $new_message = $('<li>').html(msg);

        // the newest message should be highlighted with a yellow background
        $new_message.addClass('new');

        // remove the previous new message, if any
        $('.new').toggleClass('new').toggleClass('old');

        // add the new message to the page
        $('#messages').append($new_message);

        // go to the bottom of the window
        window.scrollTo(0,document.body.scrollHeight);
    });
});
