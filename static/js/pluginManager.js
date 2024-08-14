// pluginManager.js
import ChatUI from './chatUI.js';
import ApiService from './apiService.js';
import ConversationManager from './conversationManager.js';

const PluginManager = {
    elements: {},
    currentPlugin: null,

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadAvailablePlugins();
    },

    cacheDOM() {
        this.elements = {
            llmPluginSelect: document.getElementById('llm-plugin-select')
        };
    },

    bindEvents() {
        this.elements.llmPluginSelect.addEventListener('change', this.handlePluginChange.bind(this));
    },

    loadAvailablePlugins() {
        ApiService.getAvailablePlugins()
            .then(data => {
                this.elements.llmPluginSelect.innerHTML = '';
                data.plugins.forEach(plugin => {
                    const option = document.createElement('option');
                    option.value = plugin;
                    option.textContent = plugin;
                    this.elements.llmPluginSelect.appendChild(option);
                });
                this.currentPlugin = this.elements.llmPluginSelect.value;
            })
            .catch(error => {
                console.error('Error:', error);
                ChatUI.showStatus('Error loading LLM plugins');
            });
    },

    handlePluginChange() {
        const selectedPlugin = this.elements.llmPluginSelect.value;
        ChatUI.showStatus(`Switching to ${selectedPlugin}...`);

        ApiService.setLLMPlugin(selectedPlugin)
            .then(data => {
                if (data.status === 'success') {
                    this.currentPlugin = selectedPlugin;
                    ChatUI.showStatus(`LLM plugin set to ${selectedPlugin}`);
                    if (ConversationManager.currentConversationId) {
                        ConversationManager.loadConversation(ConversationManager.currentConversationId);
                    }
                } else {
                    ChatUI.showStatus(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                ChatUI.showStatus('Error setting LLM plugin');
            });
    },

    getCurrentPlugin() {
        return this.currentPlugin;
    }
};

export default PluginManager;