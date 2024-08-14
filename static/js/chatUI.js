// static/js/chatUI.js
import ApiService from './apiService.js';
import PluginManager from './pluginManager.js';

const ChatUI = {
    elements: {},
    messageHandler: null,

    init(messageHandler) {
        this.messageHandler = messageHandler;
        this.cacheDOM();
        this.bindEvents();
        this.addInputResizeListener();
    },

    cacheDOM() {
        this.elements = {
            chatContainer: document.getElementById('chat-container'),
            userInput: document.getElementById('user-input'),
            sendButton: document.getElementById('send-button'),
            maxTokensInput: document.getElementById('max-tokens'),
            tokenInfo: document.getElementById('token-info'),
            costInfo: document.getElementById('cost-info'),
            systemPromptInput: document.getElementById('system-prompt'),
            updateSystemPromptButton: document.getElementById('update-system-prompt'),
            updateStatus: document.getElementById('update-status')
        };
    },

    bindEvents() {
        this.elements.sendButton.addEventListener('click', () => this.messageHandler.sendMessage());
        this.elements.userInput.addEventListener('keydown', this.handleEnterKey.bind(this));
        this.elements.updateSystemPromptButton.addEventListener('click', this.updateSystemPrompt.bind(this));
    },

    handleEnterKey(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.messageHandler.sendMessage();
        }
    },

    addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        if (sender === 'assistant') {
            messageDiv.innerHTML = marked.parse(text);
        } else {
            const preElement = document.createElement('pre');
            preElement.classList.add('user-message-content');
            preElement.textContent = text;
            messageDiv.appendChild(preElement);
        }
        
        this.elements.chatContainer.appendChild(messageDiv);
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    },

    updateTokenAndCostInfo(data) {
        this.elements.tokenInfo.textContent = `Total Input tokens: ${data.input_tokens} | Total Output tokens: ${data.output_tokens}`;
        this.elements.costInfo.textContent = `Total cost: $${data.total_cost.toFixed(6)} (Using ${PluginManager.getCurrentPlugin()})`;
    },

    updateSystemPrompt() {
        const systemPrompt = this.elements.systemPromptInput.value;
        ApiService.updateSystemPrompt(systemPrompt)
            .then(data => {
                if (data.status === 'system prompt updated') {
                    this.showStatus('System prompt updated successfully');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.showStatus('Error updating system prompt');
            });
    },

    showStatus(message, duration = 3000) {
        this.elements.updateStatus.textContent = message;
        setTimeout(() => { this.elements.updateStatus.textContent = ''; }, duration);
    },

    addInputResizeListener() {
        this.elements.userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
};

export default ChatUI;