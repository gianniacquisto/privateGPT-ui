<template>
    <div class="document-window">
        <div>
            <h3>Chats</h3>
            <button @click="newChatSwitch">New Chat</button>
        </div>
        <div v-for="chat in store.chats" @click="selectChat(chat)" class="document">
            <div v-if="chat">
                {{ chat.name }}
            </div>
        </div>
    </div>
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
            this.$emit('chatSelected', chat.id)
            console.log(`Chat selected with id: ${chat.id}`);
        },
        newChatSwitch() {
            // this.store.chats = [] // here lies the problem
            this.store.activeChatId = ""
            this.store.newChatSwitch = !this.store.newChatSwitch

        }
    }
};
</script>
  
<style scoped>
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
</style>