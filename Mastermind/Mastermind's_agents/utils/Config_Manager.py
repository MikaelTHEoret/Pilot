###🤖🤖🤖 [SA+ME, LCP>MS+MF, CODE=DIR, SPEC(F+L), REQ>INFO, SUM(INT)=DATA, #CTX] 🤖🤖🤖
#C:\Users\Mik\PycharmProjects\Johnny\utils\Config_Manager.py

import yaml
import shutil
import tempfile
import os
import uuid  # Importing uuid for unique_id generation

class ConfigManager:
    def __init__(self, template_dir, config_dir):
        # Initialize configuration and template directories.
        self.template_dir = template_dir
        self.config_dir = config_dir
        self.temp_dir = tempfile.mkdtemp(dir=self.template_dir)  # Temporary directory for runtime configs.

    def create_config(self, base_name):
        # Create a new configuration file based on a template.
        template_path = os.path.join(self.template_dir, 'window_config_template.yaml')
        count = self.get_next_count(base_name)
        new_name = f"{base_name}{count}"
        new_config_path = os.path.join(self.temp_dir, f"{new_name}_config.yaml")

        with open(template_path, 'r') as template_file:
            config_data = yaml.safe_load(template_file)

        with open(new_config_path, 'w') as new_config_file:
            yaml.dump(config_data, new_config_file)

        return new_config_path, new_name

    def get_next_count(self, base_name):
        # Determine the next unique count for a base_name.
        existing_files = os.listdir(self.temp_dir)
        counts = [int(file.replace(base_name, '').replace('_config.yaml', ''))
                  for file in existing_files if base_name in file and file.endswith('_config.yaml')]
        next_count = max(counts) + 1 if counts else 1
        return next_count

    def cleanup(self):
        # Cleanup temporary configuration directory.
        shutil.rmtree(self.temp_dir)

    def get_config(self, class_name):
        # Fetch a configuration for a given class.
        config_path = os.path.join(self.config_dir, f"{class_name}_config.yaml")
        if not os.path.exists(config_path):
            self.create_config_from_template(class_name, config_path)
        with open(config_path, 'r') as config_file:
            return yaml.safe_load(config_file)

    def create_unique_config(self, class_name):
        # Create a uniquely identified configuration file.
        unique_id = str(uuid.uuid4())
        config_path = os.path.join(self.config_dir, f"{class_name}_config_{unique_id}.yaml")
        self.create_config_from_template(class_name, config_path)
        return unique_id

    def create_config_from_template(self, class_name, config_path, window_name=None):
        # Create configuration from a specified template.
        template_path = os.path.join(self.template_dir, f"{class_name}_config_template.yaml")
        with open(template_path, 'r') as template_file:
            config_data = yaml.safe_load(template_file)
        with open(config_path, 'w') as config_file:
            yaml.dump(config_data, config_file)




# Assuming the current working directory is the project root when running this script.
config_manager = ConfigManager(template_dir='./config_templates', config_dir='./configs')
gui_config = config_manager.get_config('gui')
chatgpt_config = config_manager.get_config('chatgpt')