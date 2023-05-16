from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class FileListener:
    def __init__(self, path, onchange) -> None:
        self.__observer = Observer()
        self.__observer.schedule(FileChangeHandler(onchange), path, recursive=True)
        
    def start(self):
        try:
            self.__observer.start()
            self.__observer.join()
        except KeyboardInterrupt:
            self.__observer.stop()


class FileChangeHandler(FileSystemEventHandler):
    
    def __init__(self, onchange) -> None:
        super().__init__()
        self.__onchange = onchange
    
    def on_any_event(self, event):
        if event.is_directory:
            return
        if event.event_type in ['created','deleted','moved']:
            self.__onchange()