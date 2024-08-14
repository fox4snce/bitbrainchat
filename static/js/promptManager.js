// promptManager.js
import ChatUI from './chatUI.js';
import ApiService from './apiService.js';

const PromptManager = {
    elements: {},

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadSavedPrompts();
    },

    cacheDOM() {
        this.elements = {
            promptNameInput: document.getElementById('prompt-name'),
            savePromptButton: document.getElementById('save-prompt'),
            loadPromptButton: document.getElementById('load-prompt'),
            deletePromptButton: document.getElementById('delete-prompt'),
            savedPromptsSelect: document.getElementById('saved-prompts')
        };
    },

    bindEvents() {
        this.elements.savePromptButton.addEventListener('click', this.savePrompt.bind(this));
        this.elements.loadPromptButton.addEventListener('click', this.loadPrompt.bind(this));
        this.elements.deletePromptButton.addEventListener('click', this.deletePrompt.bind(this));
    },

    savePrompt() {
        const name = this.elements.promptNameInput.value.trim();
        const prompt = ChatUI.elements.systemPromptInput.value.trim();
        if (name && prompt) {
            ApiService.savePrompt(name, prompt)
                .then(data => {
                    if (data.status === 'prompt saved') {
                        ChatUI.showStatus('Prompt saved successfully');
                        this.loadSavedPrompts();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    ChatUI.showStatus('Error saving prompt');
                });
        } else {
            ChatUI.showStatus('Please enter both a name and a prompt');
        }
    },

    loadPrompt() {
        const name = this.elements.savedPromptsSelect.value;
        if (name) {
            ApiService.loadPrompt(name)
                .then(data => {
                    if (data.status === 'prompt loaded') {
                        ChatUI.elements.systemPromptInput.value = data.prompt;
                        ChatUI.showStatus('Prompt loaded successfully');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    ChatUI.showStatus('Error loading prompt');
                });
        } else {
            ChatUI.showStatus('Please select a prompt to load');
        }
    },

    deletePrompt() {
        const name = this.elements.savedPromptsSelect.value;
        if (name) {
            ApiService.deletePrompt(name)
                .then(data => {
                    if (data.status === 'prompt deleted') {
                        ChatUI.showStatus('Prompt deleted successfully');
                        this.loadSavedPrompts();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    ChatUI.showStatus('Error deleting prompt');
                });
        } else {
            ChatUI.showStatus('Please select a prompt to delete');
        }
    },

    loadSavedPrompts() {
        ApiService.listPrompts()
            .then(data => {
                this.elements.savedPromptsSelect.innerHTML = '';
                data.prompts.forEach(prompt => {
                    const option = document.createElement('option');
                    option.value = prompt;
                    option.textContent = prompt;
                    this.elements.savedPromptsSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                ChatUI.showStatus('Error loading saved prompts');
            });
    }
};

export default PromptManager;