from gettext import gettext as _
from gi.repository import GObject, Gtk, Gedit

import redis
import threading
import json

class RedisListener(threading.Thread):

    def __init__(self, bot):
        threading.Thread.__init__(self)
        self.bot = bot
        self.redis = redis.Redis()
        self.pubsub = self.redis.pubsub()
        self.pubsub.subscribe(['line'])

    def run(self):
        for item in self.pubsub.listen():
            if item['type'] == 'message':
                # XXX why does this send as bytes instead of utf8
                #print(str.decode(item['data'], 'utf-8'))
                data = json.loads(item['data'].decode(encoding='UTF-8'))
                # (line - 1), since 0-indexed
                self.bot.goto_line(data['filename'], data['function'], data['line'] - 1)

class CS50Bot(GObject.Object, Gedit.AppActivatable):
    __gtype_name__ = "CS50BotPlugin"

    app = GObject.property(type=Gedit.App)

    # TODO is untouched

    def __init__(self):
        GObject.Object.__init__(self)
        RedisListener(self).start()

    def do_activate(self):
        #views = self.app.get_views()
        #doc = self.window.get_active_document()
        #if not doc:
        #    return
        #doc.goto_line(3)
        pass

    def do_deactivate(self):
        pass

    def goto_line(self, filename, function, line):
        # XXX get_windows vs get_main_windows?
        for window in self.app.get_windows():
            for doc in window.get_documents():
                # XXX is this the right comparison to make?
                # add in offset?
                if filename == doc.get_short_name_for_display():
                    doc.goto_line(line)

                    tab = Gedit.Tab.get_from_document(doc)
                    window.set_active_tab(tab)
                    break

