import tkinter as tk
from tkinter import ttk
import os
from PIL import Image, ImageTk

import tkinter as tk
from tkinter import ttk
import os
from PIL import Image, ImageTk


class ChatBox(tk.Toplevel):
    def __init__(self, master, main_integration, channels=[]):
        super().__init__(master)
        self.main_integration = main_integration
        self.selected_channels = channels
        self.messages = []
        self.title("Chat Box")
        self.create_widgets()

    def create_widgets(self):
        # Channel selection UI
        self.channel_label = tk.Label(self, text="Select Channel(s):")
        self.channel_label.grid(row=0, column=0, padx=10, pady=5, sticky="w")

        self.channel_var = tk.StringVar(self)
        self.channel_dropdown = ttk.Combobox(self, textvariable=self.channel_var, width=20, state="readonly",
                                             values=self.selected_channels)
        self.channel_dropdown.grid(row=0, column=1, padx=10, pady=5)

        self.add_button = tk.Button(self, text="Add", command=self.add_channel)
        self.add_button.grid(row=0, column=2, padx=10, pady=5)

        self.remove_button = tk.Button(self, text="Remove", command=self.remove_channel)
        self.remove_button.grid(row=0, column=3, padx=10, pady=5)

        # Messaging UI
        self.prompt_input = tk.Entry(self, width=50)
        self.prompt_input.grid(row=1, column=0, padx=10, pady=5)

        self.send_button = tk.Button(self, text="Send", command=self.send_prompt_to_chatgpt)
        self.send_button.grid(row=1, column=1, padx=10, pady=5)

        self.message_display = tk.Text(self, state='disabled', height=10)
        self.message_display.grid(row=2, column=0, columnspan=4, sticky="nsew", padx=10, pady=5)

        # OK button to close window
        self.ok_button = tk.Button(self, text="OK", command=self.close_window)
        self.ok_button.grid(row=3, column=0, columnspan=4, padx=10, pady=5)

    def send_prompt_to_chatgpt(self):
        prompt = self.prompt_input.get()
        self.prompt_input.delete(0, tk.END)

        # Check if prompt contains commands related to script modification
        if any(keyword in prompt.lower() for keyword in ['modify script', 'update module']):
            # If commands detected, send prompt to ChatGPT for further processing
            self.main_integration.query_chatgpt_and_update_gui(prompt)
        else:
            # Otherwise, proceed with standard processing
            self.main_integration.query_chatgpt_and_update_gui(prompt)

    def update_text_widget(self, message):
        self.message_display.configure(state='normal')
        self.message_display.insert(tk.END, message + "\n")
        self.message_display.configure(state='disabled')
        self.message_display.see(tk.END)

    def add_channel(self):
        # Add channel logic
        pass

    def remove_channel(self):
        # Remove channel logic
        pass

    def update_dropdown_options(self):
        self.channel_dropdown['values'] = self.selected_channels

    def update_channels(self, channels):
        self.selected_channels = channels
        self.update_dropdown_options()

    def close_window(self):
        self.destroy()

        # Your existing widget setup code...

