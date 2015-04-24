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
                self.bot.goto_line(data['filename'], data['line'] - 1, data['char'])

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

    def goto_line(self, filename, line, char):
        # XXX get_windows vs get_main_windows?
        for window in self.app.get_windows():
            for doc in window.get_documents():
                # XXX is this the right comparison to make?
                # add in offset?
                if filename == doc.get_short_name_for_display():
                    doc.goto_line_offset(line, char)

                    tab = Gedit.Tab.get_from_document(doc)
                    window.set_active_tab(tab)

                    # scroll to the targeted line in the document
                    view = tab.get_view()
                    view.scroll_to_cursor();

                    tag_table = doc.get_tag_table()

                    if tag_table.lookup("highlight-error") is None:
                        doc.create_tag("highlight-error",  background = "#C9FFFC", foreground = "#000000")
                    else:
                        # delete any previously highlighted lines
                        start = doc.get_start_iter()
                        end = doc.get_end_iter()
                        doc.remove_tag_by_name("highlight-error", start, end)

                    # highlight the line with the error
                    iter1 = doc.get_iter_at_line(line)
                    iter2 = doc.get_iter_at_line(line + 1)
                    doc.apply_tag_by_name("highlight-error", iter1, iter2)

                    break

