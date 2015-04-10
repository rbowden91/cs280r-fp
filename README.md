# cs280r-fp

## How it works
The Gedit plugin terminal.py (/usr/lib/i386-linux-gnu/gedit/plugins/terminal.py) was modified to log all of its output
to a named pipe (/opt/bot50/terminal\_output). The bot50 server is waiting for data on that named pipe, and when it sees
data it attempts to parse it for errors. If an error is found, an appropriate message is sent out over all websockets
listening at http://localhost:3000. It's this web page that interfaces with users as the CS50 Bot.
