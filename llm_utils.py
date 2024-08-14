# llm_utils.py

import os
import importlib
import importlib.util
from abc import ABC, abstractmethod

class LLMClient(ABC):
    @abstractmethod
    def generate_response(self, system, user_message, max_tokens, temperature):
        pass

    @abstractmethod
    def count_tokens(self, text):
        pass

class LLMPluginManager:
    def __init__(self, plugin_folder="llm_plugins"):
        self.plugin_folder = plugin_folder
        self.plugins = {}
        self.load_plugins()

    def load_plugins(self):
        for filename in os.listdir(self.plugin_folder):
            if filename.endswith(".py") and not filename.startswith("__"):
                plugin_name = filename[:-3]  # Remove .py extension
                plugin_path = os.path.join(self.plugin_folder, filename)
                spec = importlib.util.spec_from_file_location(plugin_name, plugin_path)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)
                
                for item_name in dir(module):
                    item = getattr(module, item_name)
                    if isinstance(item, type) and issubclass(item, LLMClient) and item is not LLMClient:
                        self.plugins[plugin_name] = item
                        break

    def get_plugin_names(self):
        return list(self.plugins.keys())

    def get_plugin(self, plugin_name):
        return self.plugins.get(plugin_name)

plugin_manager = LLMPluginManager()

def get_llm_client(client_type):
    plugin_class = plugin_manager.get_plugin(client_type)
    if plugin_class:
        return plugin_class()
    else:
        raise ValueError(f"Unsupported LLM client type: {client_type}")

def generate_response(system=None, user_message=None, max_tokens=4096, temperature=0.8, client_type="claude"):
    client = get_llm_client(client_type)
    return client.generate_response(system, user_message, max_tokens, temperature)

def generate_text_response(system=None, user_message=None, max_tokens=4096, temperature=0.8, client_type="claude"):
    return generate_response(system, user_message, max_tokens, temperature, client_type)

def generate_json_response(system=None, user_message=None, max_tokens=4096, temperature=0.8, client_type="claude"):
    if user_message is None:
        user_message = "Please provide your response in valid JSON format."
    else:
        user_message += "\nPlease provide your response in valid JSON format."
    response = generate_response(system, user_message, max_tokens, temperature, client_type)
    try:
        import json
        json_response = json.loads(response)
    except json.JSONDecodeError:
        return response
    return json_response

def count_tokens(text, client_type="claude"):
    client = get_llm_client(client_type)
    return client.count_tokens(text)

def get_available_llm_plugins():
    return plugin_manager.get_plugin_names()