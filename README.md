# BitbrainChat

BitbrainChat is an advanced, extensible chat application for interacting with various large language models (LLMs). Built upon the foundation of Simple Claude Chat, BitbrainChat takes things to the next level by introducing a plugin system that allows for easy integration of different LLMs and customizable features.

## Features

- Web-based interface for chatting with various LLMs (including Claude 3.5 Sonnet and more)
- Plugin system for easy integration of new LLMs
- Configurable chat history to control API costs
- Customizable system prompts with save/load functionality
- Multiple conversation support
- Token usage and cost tracking
- Extensible architecture for future enhancements

## Prerequisites

- Python 3.7+
- Flask
- Anthropic API key (for Claude plugin)
- API keys for other LLMs as needed

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/fox4snce/bitbrainchat.git
   cd bitbrainchat
   ```

2. Install the required dependencies:
   ```
   pip install flask anthropic
   ```

3. Set your API keys as environment variables:
   ```
   export ANTHROPIC_API_KEY='your_anthropic_api_key_here'
   # Set other API keys as needed for additional LLM plugins
   ```

## Usage

1. Run the Flask application:
   ```
   python app.py
   ```

2. Open your web browser and navigate to `http://localhost:5000`

3. Select your desired LLM plugin from the dropdown menu

4. Start chatting!

## LLM Plugins

BitbrainChat now supports a plugin system for integrating various LLMs. To use a different LLM:

1. Select the desired LLM from the dropdown menu in the user interface.
2. The chat will now use the selected LLM for generating responses.

To add a new LLM plugin:

1. Create a new Python file in the `llm_plugins` directory.
2. Implement the required `LLMClient` interface.
3. Place the file in the `llm_plugins` directory.
4. Restart the application to load the new plugin.

For detailed instructions on creating and using plugins, refer to the [LLM Plugin Guide](llm_plugin_guide.md).

## Customization

- Modify the system prompt in the web interface to change the LLM's behavior
- Adjust the max tokens in the UI to control the length of the conversation history
- Edit the CSS files in the `static/css` directory to customize the appearance
- Create new plugins to add support for additional LLMs or custom functionality

## Future Plans

BitbrainChat is actively being developed with plans to introduce more plugin-based features, allowing users to customize the client exactly to their needs. Stay tuned for updates!

## Contributing

We welcome contributions to BitbrainChat! Feel free to fork the repository, make your improvements, and submit a pull request.

## Disclaimer

This project is not officially affiliated with or endorsed by Anthropic or any other LLM provider. Use of any LLM API is subject to the respective provider's terms of service.

## License

This project is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

BitbrainChat: Empowering your conversations with the flexibility of choice!