# llm_plugins/claude_plugin.py

import anthropic
from llm_utils import LLMClient

class ClaudeClient(LLMClient):
    def __init__(self):
        self.client = anthropic.Anthropic()

    def generate_response(self, system, user_message, max_tokens=4096, temperature=0.8):
        system_prompt = f'''
        Always use well-formatted markdown.

        {system}
        '''

        messages = [{"role": "user", "content": user_message}]

        kwargs = {
            "model": "claude-3-5-sonnet-20240620",
            "max_tokens": max_tokens,
            "temperature": temperature,
            "messages": messages,
            "system": system_prompt
        }

        response = self.client.messages.create(**kwargs)
        return response.content[0].text

    def count_tokens(self, text):
        return self.client.count_tokens(text)