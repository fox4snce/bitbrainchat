# LLM Plugin Guide for Chat Application

## Table of Contents
1. [Introduction](#introduction)
2. [Plugin Structure](#plugin-structure)
3. [Creating a New Plugin](#creating-a-new-plugin)
4. [Installing a Plugin](#installing-a-plugin)
5. [Using Plugins in the Chat Application](#using-plugins-in-the-chat-application)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Introduction

This guide explains how to create, install, and use LLM (Language Model) plugins in our chat application. The plugin system allows you to easily integrate different language models or AI services into the application, providing flexibility and extensibility.

## Plugin Structure

Each plugin is a Python file that defines a class inheriting from the `LLMClient` abstract base class. The plugin must implement two methods:

1. `generate_response`: Generates a response given a system prompt and user message.
2. `count_tokens`: Counts the number of tokens in a given text.

## Creating a New Plugin

To create a new plugin, follow these steps:

1. Create a new Python file in the `llm_plugins` directory.
2. Name your file descriptively, e.g., `gpt4_plugin.py`.
3. Import the necessary modules and the `LLMClient` base class:

   ```python
   from llm_utils import LLMClient
   # Import any other necessary modules for your specific LLM
   ```

4. Define your plugin class, inheriting from `LLMClient`:

   ```python
   class GPT4Client(LLMClient):
       def __init__(self):
           # Initialize your client here
           pass

       def generate_response(self, system, user_message, max_tokens=4096, temperature=0.8):
           # Implement the response generation logic
           pass

       def count_tokens(self, text):
           # Implement the token counting logic
           pass
   ```

5. Implement the required methods according to your LLM's API and functionality.

Here's an example of a minimal plugin:

```python
from llm_utils import LLMClient
import your_llm_library

class YourLLMClient(LLMClient):
    def __init__(self):
        self.client = your_llm_library.Client()

    def generate_response(self, system, user_message, max_tokens=4096, temperature=0.8):
        response = self.client.generate(
            system_prompt=system,
            user_input=user_message,
            max_length=max_tokens,
            temperature=temperature
        )
        return response.text

    def count_tokens(self, text):
        return self.client.count_tokens(text)
```

## Installing a Plugin

To install a plugin:

1. Place your plugin file (e.g., `your_llm_plugin.py`) in the `llm_plugins` directory of the chat application.
2. Restart the application. The plugin manager will automatically detect and load your new plugin.

## Using Plugins in the Chat Application

Once a plugin is installed:

1. Start or restart the chat application.
2. In the user interface, you'll see a dropdown menu labeled "LLM Plugin".
3. Your newly installed plugin should appear in this dropdown.
4. Select the plugin you want to use.
5. The chat application will now use this plugin for generating responses and counting tokens.

You can switch between different plugins at any time using the dropdown menu.

## Best Practices

1. **Error Handling**: Implement robust error handling in your plugin. Catch and handle exceptions that may occur during API calls or processing.

2. **Configuration**: If your plugin requires API keys or other configuration, consider using environment variables or a configuration file.

3. **Documentation**: Include clear documentation in your plugin file, explaining any specific requirements or features of your LLM.

4. **Performance**: Be mindful of performance, especially in the `count_tokens` method, as it may be called frequently.

5. **Consistency**: Try to maintain consistency in response format and behavior across different plugins to ensure a smooth user experience.

## Troubleshooting

If you encounter issues with your plugin:

1. **Plugin Not Appearing**: Ensure your plugin file is in the correct directory and follows the naming convention (e.g., no spaces, ends with `.py`).

2. **Runtime Errors**: Check the application logs for error messages. Ensure all required methods are implemented correctly.

3. **Unexpected Behavior**: Verify that your plugin's `generate_response` and `count_tokens` methods are behaving as expected. You may want to add logging or print statements for debugging.

4. **Performance Issues**: If your plugin is slow, consider optimizing your code or using asynchronous operations if supported by your LLM's API.

Remember, you can always refer to the existing plugins (like `claude_plugin.py`) as examples when creating your own plugins.

Happy plugin development!