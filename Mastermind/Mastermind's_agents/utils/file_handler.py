#C:\Users\Mik\PycharmProjects\Johnny\utils\file_handler.py
from tkinter import filedialog
import subprocess

def import_document():
    """
    Opens a file dialog to import a document and returns its file path.
    """
    file_path = filedialog.askopenfilename(title="Import Document")
    if file_path:
        # Here, you can return the file path or directly process the document as needed
        return file_path

def execute_command(command):
    """
    Executes a given shell command and returns its output.
    """
    try:
        output = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)
        return output
    except subprocess.CalledProcessError as e:
        return e.output

def send_command_to_terminal(command):
    """
    Takes a command as input, executes it, and returns the output.
    """
    output = execute_command(command)
    # Assuming 'update_chat_display' updates some display widget with the command's output
    # This functionality would need to be implemented within the context where this function is called
    return output


#Key Points:
#Generalization: The functions are defined outside a class to make them more general-purpose. If these need to be methods of a specific class (e.g., part of a GUI class), you may need to reintroduce the self parameter and adjust the usage accordingly.
#Error Handling: execute_command includes basic error handling for command execution, capturing and returning the output even in case of errors.
#UI Updates: The send_command_to_terminal function's comment about update_chat_display suggests it's intended to be part of a larger UI class. Ensure to integrate it into your GUI logic where you have access to UI elements like text_input and a method or widget to display the output (update_chat_display).
#Integration and Usage:
#For GUI applications, integrate these functions into relevant classes that manage file operations and terminal interactions. Ensure GUI elements (like text input fields or display areas) are accessible.
#Standalone usage of import_document and send_command_to_terminal can be done by calling them directly in scripts or terminal operations, adapting their return values or parameters as needed for your application's flow.
#This structure and functionality setup in file_handler.py aligns with common practices for handling files and executing commands within Python applications, offering flexibility for both GUI and terminal-based operations.






