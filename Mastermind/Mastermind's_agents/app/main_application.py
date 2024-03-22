###🤖🤖🤖 [SA+ME, LCP>MS+MF, CODE=DIR, SPEC(F+L), REQ>INFO, SUM(INT)=DATA, #CTX, RD=DIRMAP] 🤖🤖🤖 🤖🤖🤖
# # C:\Users\Mik\PycharmProjects\Johnny\app\main_application.py

import importlib.util
import tkinter as tk
from tkinter import simpledialog, filedialog, messagebox
import os
import importlib.util
import tkinter as tk
from utils.Config_Manager import ConfigManager
from .custom_window import CustomWindow  # Update import to use CustomWindow

class MainApplication(tk.Tk):
    def __init__(self, template_dir='config_templates', config_dir='configs'):
        super().__init__()
        self.template_dir = template_dir
        self.config_dir = config_dir
        self.initialize_menu()

    def initialize_menu(self):
        menu_bar = tk.Menu(self)
        self.config(menu=menu_bar)

        file_menu = tk.Menu(menu_bar, tearoff=0)
        file_menu.add_command(label="New Window", command=self.create_new_window)
        menu_bar.add_cascade(label="File", menu=file_menu)

    def create_new_window(self):
        config_manager = ConfigManager(template_dir=self.template_dir, config_dir=self.config_dir)
        new_window = CustomWindow(self, config_manager)  # Updated to use CustomWindow class
        new_window.mainloop()


    def show_help(self):
        # Assuming 'commands' is a global dictionary or fetched from somewhere
        help_text = "Available Commands:\n" + "\n".join(f"{cmd}: {desc}" for cmd, desc in commands.items())
        print(help_text)


class CoreGUI(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title('Modular OS-like GUI')
        self.geometry('1024x768')
        self.initialize_menu()

    def initialize_menu(self):
        menu_bar = tk.Menu(self)
        self.config(menu=menu_bar)

        file_menu = tk.Menu(menu_bar, tearoff=0)
        file_menu.add_command(label="New Window", command=self.create_new_window)
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=self.quit)

        menu_bar.add_cascade(label="File", menu=file_menu)

    def create_new_window(self):
        class_type = simpledialog.askstring("Window Type", "Enter the class type for the new window:")
        if class_type:
            new_window = Window(self, class_type)  # Assuming Window class takes CoreGUI instance and class type
            new_window.mainloop()

    def load_module(self):
        filepath = filedialog.askopenfilename(title="Select Module",
                                              filetypes=(("Python files", "*.py"), ("All files", "*.*")))
        if not filepath:
            return
        module_name, _ = os.path.splitext(os.path.basename(filepath))

        spec = importlib.util.spec_from_file_location(module_name, filepath)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)

        if hasattr(module, 'run'):
            module.run(self)
        else:
            messagebox.showwarning('Module Loader', f'The module {module_name} does not have a run method.')

if __name__ == "__main__":
    app = CoreGUI()
    app.mainloop()
