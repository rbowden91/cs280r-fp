SHELL:=/bin/bash

install:
	# start redis server
	sudo apt-get install redis-server python3-setuptools
	sudo easy_install3 redis
	sudo chmod 644 /usr/local/lib/python3.4/dist-packages/*
	sudo mv /usr/lib/i386-linux-gnu/gedit/plugins/terminal{,_backup}.py || true
	sudo cp terminal.py /usr/lib/i386-linux-gnu/gedit/plugins/terminal.py
	sudo cp -r bot50_gedit* /usr/lib/i386-linux-gnu/gedit/plugins/
	sudo chmod 644 /usr/lib/i386-linux-gnu/gedit/plugins/{terminal.py,bot50_gedit.*}
	sudo mkdir -p /opt/bot50/
	sudo cp -r node_modules public bot50.js errors.js error_suggestions.js esc_seq_cleaner.pl /opt/bot50
	sudo mkfifo /opt/bot50/terminal_output || true
	sudo chown -R jharvard.students /opt/bot50
	sudo chmod 755 /opt/bot50/{bot50.js,esc_seq_cleaner.pl}
	sudo cp bot50 /usr/bin/bot50
	sudo chmod 755 /usr/bin/bot50

uninstall:
	sudo mv /usr/lib/i386-linux-gnu/gedit/plugins/terminal{_backup,}.py || true
	sudo rm -f /usr/lib/i386-linux-gnu/gedit/plugins/bot50_gedit*
	sudo rm -rf /opt/bot50/
	sudo rm -f /usr/bin/bot50
