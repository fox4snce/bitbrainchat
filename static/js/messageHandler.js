// static/js/messageHandler.js
import ApiService from './apiService.js';
import PluginManager from './pluginManager.js';
import ConversationManager from './conversationManager.js';

const MessageHandler = {
    chatUI: null,

    init(chatUI) {
        this.chatUI = chatUI;
    },

    sendMessage() {
        const userInput = this.chatUI.elements.userInput;
        const message = userInput.value.trim();
        const maxTokens = this.chatUI.elements.maxTokensInput.value;

        if (message) {
            this.chatUI.addMessage('user', message);
            userInput.value = '';
            userInput.style.height = 'auto';

            ApiService.sendChatMessage(message, maxTokens, PluginManager.getCurrentPlugin())
                .then(data => {
                    this.chatUI.addMessage('assistant', data.response);
                    this.chatUI.updateTokenAndCostInfo(data);
                    ConversationManager.updateConversationList();
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.chatUI.addMessage('assistant', 'An error occurred. Please try again.');
                });
        }
    }
};

export default MessageHandler;