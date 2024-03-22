# utils/commands.py

import subprocess

# Global dictionary to store command functions and their descriptions
command_list = {}


def command(cmd, description=""):
    """Decorator to register a function as a command.

    Args:
        cmd (str): The command string.
        description (str): A short description of what the command does.

    This decorator should be used to register all future command functions
    to ensure they are dynamically recognized and handled by the application.
    """

    def decorator(func):
        command_list[cmd] = {'function': func, 'description': description}
        return func

    return decorator


# Utility function for executing system commands
def execute_command(command):
    """Executes a system command securely and returns its output."""
    try:
        result = subprocess.run(command, shell=False, text=True, capture_output=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return f"An error occurred: {e}"


# Example command functions
@command('/save', "Saves the current state of the application for later retrieval.")
def save_state():
    # Placeholder for saving application state
    pass


@command('/load', "Loads a previously saved state of the application.")
def load_state():
    # Placeholder for loading application state
    pass


@command('/help', "Provides a list of available commands and their descriptions.")
def show_help():
    """Dynamically generates and prints available commands and their descriptions."""
    help_text = "Available Commands:\n" + "\n".join(
        f"{cmd}: {info['description']}" for cmd, info in command_list.items()
    )
    print(help_text.strip())


# Additional command placeholders
# Use the @command decorator to register new commands as needed ( and previously added one that might have been left behind

# Example of how to execute a registered command (for demonstration)
if __name__ == "__main__":
    # This would simulate invoking the help command to display all available commands
    command_list['/help']['function']()
