import tkinter as tk
from tkinter import Toplevel, scrolledtext, ttk, Menu, simpledialog, messagebox
import yaml
import importlib.util

class Application(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Main GUI Integration")
        self.geometry("800x600")

        # Load configuration
        self.config = self.load_configuration()

        self.create_widgets()
        self.load_additional_scripts()

    def load_configuration(self):
        try:
            with open("config.yaml", 'r') as file:
                config = yaml.safe_load(file)
                messagebox.showinfo("Configuration Loaded", "Configuration loaded successfully.")
                return config
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load configuration.\nError: {e}")
            return None

    def create_widgets(self):
        # Menu
        self.menu = Menu(self)
        self.config(menu=self.menu)
        self.file_menu = Menu(self.menu, tearoff=0)
        self.file_menu.add_command(label="Load Configuration", command=self.load_configuration)
        self.menu.add_cascade(label="File", menu=self.file_menu)

        # Command input area
        self.command_input = tk.Entry(self, width=100)
        self.command_input.pack(padx=20, pady=(10, 0))

        # Execute button
        self.execute_button = tk.Button(self, text="Execute", command=self.execute_command)
        self.execute_button.pack(pady=(5, 20))

        # Response area
        self.response_area = scrolledtext.ScrolledText(self, state='disabled', height=15)
        self.response_area.pack(padx=20, pady=10)

        # Dropdown menu for modules
        self.load_modules_dropdown()

        # Status label
        self.status_label = tk.Label(self, text="Status: Ready", bd=1, relief=tk.SUNKEN, anchor=tk.W)
        self.status_label.pack(side=tk.BOTTOM, fill=tk.X)

    def load_modules_dropdown(self):
        # Dropdown menu for modules
        modules_directory = self.config.get('modules_directory', 'modules')
        modules = self.get_available_modules(modules_directory)
        self.modules_var = tk.StringVar(self)
        self.modules_dropdown = ttk.Combobox(self, textvariable=self.modules_var)
        self.modules_dropdown['values'] = modules
        self.modules_dropdown.pack(pady=(0, 20))

    def get_available_modules(self, modules_directory):
        available_modules = []
        for filename in os.listdir(modules_directory):
            if filename.endswith('.py'):
                module_name = filename[:-3]
                available_modules.append(module_name)
        return available_modules

    def load_additional_scripts(self):
        modules_directory = self.config.get('modules_directory', 'modules')
        for filename in os.listdir(modules_directory):
            if filename.endswith('.py'):
                module_name = filename[:-3]
                module_path = os.path.join(modules_directory, filename)
                self.load_module(module_name, module_path)

    def load_module(self, module_name, module_path):
        spec = importlib.util.spec_from_file_location(module_name, module_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        messagebox.showinfo("Module Loaded", f"Module '{module_name}' loaded successfully.")

    def execute_command(self):
        command = self.command_input.get().strip()
        if command:
            self.display_response(f"Executing: {command}")
            # Placeholder for actual command execution logic

            self.command_input.delete(0, 'end')  # Clear command input

    def display_response(self, message):
        self.response_area.config(state='normal')
        self.response_area.insert(tk.END, message + "\n")
        self.response_area.config(state='disabled')
        self.response_area.see(tk.END)

    def create_window(self):
        window = Toplevel(self)
        window.title("Additional Window")
        window.geometry("400x300")
        label = tk.Label(window, text="This is an additional window.")
        label.pack(padx=20, pady=20)

if __name__ == "__main__":
    app = Application()
    app.mainloop()
