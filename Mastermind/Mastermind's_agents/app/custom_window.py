###🤖🤖🤖 [SA+ME, LCP>MS+MF, CODE=DIR, SPEC(F+L), REQ>INFO, SUM(INT)=DATA, #CTX] 🤖🤖🤖
#C:\Users\Mik\PycharmProjects\Johnny\app\custom_window.py

# C:/Users/Mik/PycharmProjects/Johnny/app/custom_window.py

# C:/Users/Mik/PycharmProjects/Johnny/app/custom_window.py

import os
import tkinter as tk
import yaml

import tkinter as tk

class CustomWindow(tk.Toplevel):
    def __init__(self, master, config_manager, base_name='Window', *args, **kwargs):
        super().__init__(master, *args, **kwargs)
        self.config_manager = config_manager
        self.config_path, self.window_name = self.config_manager.create_config(base_name)
        self.title(self.window_name)
        self.protocol("WM_DELETE_WINDOW", self.on_close)
        # Initialize the rest of the window...

    def on_close(self):
        # Perform cleanup and close the window
        self.delete_config_file()
        self.destroy()

    def delete_config_file(self):
        # Add implementation to delete config file if needed
        pass

    def rename_window(self, new_base_name):
        # Functionality to rename the window and its config file
        os.remove(self.config_path)  # Delete old config
        self.config_path, self.window_name = self.config_manager.create_config(new_base_name)
        self.title(self.window_name)

    def select_class(self, class_name):
        # Update the window's config with the selected class
        self.config['selected_class'] = class_name
        self.update_config()

    def update_config(self):
        # Write the updated configuration back to the file
        config_path = os.path.join(self.config_manager.config_dir, f"{self.config['window_name']}_config.yaml")
        with open(config_path, 'w') as config_file:
            yaml.dump(self.config, config_file)
        # This is also where you'd dynamically update the UI based on new config

    def create_taskbar_channels(self, channels):
        for channel in channels:
            menu = tk.Menu(self.taskbar, tearoff=0)
            menu.add_command(label=f"Show {channel} channel", command=lambda ch=channel: self.show_channel(ch))
            self.taskbar.add_cascade(label=channel.capitalize(), menu=menu)

    def show_channel(self, channel):
        print(f"Showing {channel} channel")  # Placeholder for actual function
