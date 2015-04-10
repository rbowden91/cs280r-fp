SHELL:=/bin/bash

install:
	sudo mv /usr/lib/i386-linux-gnu/gedit/plugins/terminal{,_backup}.py || true
	sudo cp terminal.py /usr/lib/i386-linux-gnu/gedit/plugins/terminal.py
	sudo mkdir -p /opt/bot50/
	sudo cp -r node_modules public index.js errors.js error_suggestions.js esc_seq_cleaner.pl /opt/bot50
	sudo mkfifo /opt/bot50/terminal_output || true
	sudo chown -R jharvard.students /opt/bot50
	sudo chmod 755 /opt/bot50/{index.js,esc_seq_cleaner.pl}
	sudo ln -s /opt/bot50/index.js /usr/bin/bot50

uninstall:
	sudo mv /usr/lib/i386-linux-gnu/gedit/plugins/terminal{_backup,}.py || true
	sudo rm -rf /opt/bot50/
	sudo rm -f /usr/bin/bot50
