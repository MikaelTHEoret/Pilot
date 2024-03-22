# utils/command_executor.py

import subprocess

def execute_command(command):
    """Executes a system command securely and returns its output."""
    try:
        result = subprocess.run(command, shell=False, text=True, capture_output=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return f"An error occurred: {e}"
