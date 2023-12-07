<template>
    <div v-show="!this.store.chatIsHidden" class="document-window">
        <div>
            <h3>Chats</h3>
        </div>
        <div v-for="chat in store.chats" @click="selectChat(chat)" class="document">
            <div v-if="chat">{{ chat.name }}</div>
        </div>
        <div class="document-buttons">
            <button @click="newChatSwitch">New Chat</button>
        </div>
    </div>
    <button @click="toggleVisibility" class="toggle-component-button">
        {{ store.chatIsHidden ? '►' : '◄' }}
    </button>
</template>
<script>
import { store } from '../store';

export default {
    data() {
        return {
            store
        }
    },
    methods: {
        selectChat(chat) {
            this.store.activeChatId = chat.id
            console.log(`Chat selected with id: ${chat.id}`);
        },
        newChatSwitch() {
            this.store.activeChatId = ""
            this.store.newChatSwitch = !this.store.newChatSwitch

        },
        toggleVisibility() {
            this.store.chatIsHidden = !this.store.chatIsHidden;
        }
    }
};
</script>

<style scoped>
.toggle-btn-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.document-window {
    width: 25%;
    padding: 10px;
    overflow-y: auto;
    height: 70vh;
    display: flex;
    flex-direction: column;
}

.document {
    position: relative;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
    background-color: #e3e3e3;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.document-buttons {
    margin-top: auto;
}
</style>