C:\Users\Mik\PycharmProjects\Johnny\utils\module_registry.py
import json
import os

def load_module_registry(json_file_path='../module_registry.json'):
    """Loads module registry from a JSON file."""
    base_dir = os.path.dirname(os.path.realpath(__file__))
    full_path = os.path.join(base_dir, json_file_path)

    try:
        with open(full_path, 'r') as file:
            registry = json.load(file)
        return registry["modules"]
    except FileNotFoundError:
        print(f"Module registry file not found: {full_path}")
        return {}
    except json.JSONDecodeError:
        print(f"Error decoding JSON from file: {full_path}")
        return {}