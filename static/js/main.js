// static/js/main.js
import ChatUI from './chatUI.js';
import MessageHandler from './messageHandler.js';
import PromptManager from './promptManager.js';
import ConversationManager from './conversationManager.js';
import PluginManager from './pluginManager.js';

const App = {
    init() {
        const chatUI = ChatUI;
        const messageHandler = MessageHandler;

        chatUI.init(messageHandler);
        messageHandler.init(chatUI);

        PromptManager.init(chatUI);
        ConversationManager.init(chatUI);
        PluginManager.init(chatUI);
    }
};

document.addEventListener('DOMContentLoaded', App.init);