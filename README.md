# cs280r-fp

Run `make install && bot50` to get started!

`bot50` will start the server and open a browser window for the bot.
`bot50 -s` will start just the server.
`bot50 -b` will open just the browser window.
`bot50 -k` will kill any active server.


## How it works
The Gedit plugin terminal.py (/usr/lib/i386-linux-gnu/gedit/plugins/terminal.py) was modified to log all of its output
to a named pipe (/opt/bot50/terminal\_output). The bot50 server is waiting for data on that named pipe, and when it sees
data it attempts to parse it for errors. If an error is found, an appropriate message is sent out over all websockets
listening at http://localhost:3000. It's this web page that interfaces with users as the CS50 Bot.


## TODO
Ctrl-D in the terminal
