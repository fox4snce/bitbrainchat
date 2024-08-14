// apiService.js

const ApiService = {
    async sendChatMessage(message, maxTokens, llmPlugin) {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_message: message,
                max_tokens: maxTokens,
                llm_plugin: llmPlugin
            }),
        });
        return response.json();
    },

    async updateSystemPrompt(systemPrompt) {
        const response = await fetch('/system_prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ system_prompt: systemPrompt }),
        });
        return response.json();
    },

    async savePrompt(name, prompt) {
        const response = await fetch('/save_prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, prompt }),
        });
        return response.json();
    },

    async loadPrompt(name) {
        const response = await fetch('/load_prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        return response.json();
    },

    async deletePrompt(name) {
        const response = await fetch('/delete_prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        return response.json();
    },

    async listPrompts() {
        const response = await fetch('/list_prompts');
        return response.json();
    },

    async newConversation() {
        const response = await fetch('/new_conversation', { method: 'POST' });
        return response.json();
    },

    async listConversations() {
        const response = await fetch('/list_conversations');
        return response.json();
    },

    async setCurrentConversation(conversationId) {
        const response = await fetch('/set_current_conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversation_id: conversationId }),
        });
        return response.json();
    },

    async deleteConversation(conversationId) {
        const response = await fetch('/delete_conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversation_id: conversationId }),
        });
        return response.json();
    },

    async getAvailablePlugins() {
        const response = await fetch('/available_llm_plugins');
        return response.json();
    },

    async setLLMPlugin(pluginName) {
        const response = await fetch('/set_llm_plugin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plugin_name: pluginName }),
        });
        return response.json();
    }
};

export default ApiService;