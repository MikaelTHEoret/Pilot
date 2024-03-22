import tkinter as tk
from tkinter import scrolledtext, simpledialog, messagebox
import requests
import threading

class ChatGPTGUI(tk.Tk):
    def __init__(self, api_key):
        super().__init__()
        self.api_key = api_key
        self.title('ChatGPT Integration')
        self.geometry('400x600')

        self.chat_display = scrolledtext.ScrolledText(self, state='disabled', height=20, wrap='word')
        self.chat_display.pack(pady=5)

        self.text_input = tk.Entry(self)
        self.text_input.pack(fill='both', pady=5, padx=5)

        self.send_button = tk.Button(self, text="Send", command=self.send_message_thread)
        self.send_button.pack(pady=5)

    def send_message_thread(self):
        # Use threading to prevent UI blocking
        user_input = self.text_input.get()
        if user_input.strip() == "":
            messagebox.showinfo("Empty Message", "Please enter a message before sending.")
            return
        self.update_chat_display(f"You: {user_input}", "right")
        self.text_input.delete(0, 'end')
        threading.Thread(target=self.get_chatgpt_response, args=(user_input,), daemon=True).start()

    def update_chat_display(self, message, align='left'):
        self.chat_display.configure(state='normal')
        self.chat_display.insert(tk.END, f"{message}\n\n", align)
        self.chat_display.configure(state='disabled')
        self.chat_display.yview(tk.END)

    def get_chatgpt_response(self, user_input):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        json_data = {
            "model": "text-davinci-003",  # Consider using the latest available model
            "prompt": user_input,
            "temperature": 0.7,
            "max_tokens": 150
        }
        try:
            response = requests.post("https://api.openai.com/v1/completions", headers=headers, json=json_data)
            response.raise_for_status()
            chatgpt_response = response.json()['choices'][0]['text'].strip()
            self.update_chat_display(f"ChatGPT: {chatgpt_response}")
        except requests.exceptions.RequestException as e:
            self.update_chat_display("Failed to fetch response from ChatGPT.")
            print(f"Error: {e}")

if __name__ == "__main__":
    api_key = simpledialog.askstring("API Key", "Enter your OpenAI API Key:")
    if api_key:
        app = ChatGPTGUI(api_key)
        app.mainloop()
    else:
        messagebox.showerror("API Key Required", "An OpenAI API Key is required to run this application.")
