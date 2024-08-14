// conversationManager.js
import ChatUI from './chatUI.js';
import ApiService from './apiService.js';

const ConversationManager = {
    elements: {},
    currentConversationId: null,

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateConversationList();
    },

    cacheDOM() {
        this.elements = {
            newConversationBtn: document.getElementById('new-conversation-btn'),
            conversationList: document.getElementById('conversation-list')
        };
    },

    bindEvents() {
        this.elements.newConversationBtn.addEventListener('click', this.startNewConversation.bind(this));
    },

    startNewConversation() {
        ApiService.newConversation()
            .then(data => {
                if (data.status === 'success') {
                    ChatUI.elements.chatContainer.innerHTML = '';
                    this.updateConversationList();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                ChatUI.showStatus('Error starting new conversation');
            });
    },

    updateConversationList() {
        ApiService.listConversations()
            .then(data => {
                this.elements.conversationList.innerHTML = '';
                data.conversations.forEach(conv => {
                    const convDiv = document.createElement('div');
                    convDiv.classList.add('conversation-item');
                    convDiv.textContent = conv.name;
                    convDiv.onclick = () => this.loadConversation(conv.id);
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'X';
                    deleteBtn.onclick = (e) => {
                        e.stopPropagation();
                        this.deleteConversation(conv.id);
                    };
                    convDiv.appendChild(deleteBtn);
                    this.elements.conversationList.appendChild(convDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                ChatUI.showStatus('Error loading conversations');
            });
    },

    loadConversation(conversationId) {
        ApiService.setCurrentConversation(conversationId)
            .then(data => {
                if (data.status === 'success') {
                    ChatUI.elements.chatContainer.innerHTML = '';
                    data.conversation.messages.forEach(msg => {
                        ChatUI.addMessage(msg.role, msg.content);
                    });
                    ChatUI.updateTokenAndCostInfo(data);
                    this.currentConversationId = conversationId;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                ChatUI.showStatus('Error loading conversation');
            });
    },

    deleteConversation(conversationId) {
        ApiService.deleteConversation(conversationId)
            .then(data => {
                if (data.status === 'success') {
                    this.updateConversationList();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                ChatUI.showStatus('Error deleting conversation');
            });
    }
};

export default ConversationManager;