<template>
    <div class="chat-window" ref="chatWindow">
        <div>
            <button @click="toggleIncludeSources" :class="{ 'active': includeSources }">Include Sources</button>
            <button @click="toggleUseContext" :class="{ 'active': useContext }">Use Context</button>
        </div>
        <br>


        <div class="chat-bot" ref="chatBot" v-if="storeActiveChat">
            <div v-for="message in storeActiveChat.messages" :class="{
                'user-message': message.role === 'user',
                'bot-message': message.role === 'assistant'
            }">
                {{ message.role }}:
                <div v-for="messageText in splitMessage(message.content)">
                    <div v-if="isCode(messageText)">
                        <highlightjs autodetect :code="messageText" />
                    </div>
                    <div v-else> {{ messageText }} </div>
                </div>
            </div>
        </div>


        <div class="message-input">
            <input class="message-input-textbox" v-model="newMessage" @keyup.enter="sendMessage" />
            <button @click="sendMessage">Send Message</button>
        </div>


    </div>
</template>
  
<script>
import axios from 'axios';
import hljs from 'highlight.js';
import { store } from '../store';

export default {
    data() {
        return {
            store,
            newMessage: "",
            includeSources: false,
            useContext: true
        };
    },
    mounted() {
        this.generateChatId()
    },
    computed: {
        storeActiveChat() {
            return this.store.chats.filter(x => x.id === this.store.activeChatId)[0]
        }
    },
    methods: {
        generateChatId() {
            const chatId = crypto.randomUUID()
            this.store.activeChatId = chatId
            console.log("Generated chat id:", chatId);
        },
        toggleIncludeSources() {
            this.includeSources = !this.includeSources
        },
        toggleUseContext() {
            this.useContext = !this.useContext
        },
        sendMessage() {
            const userMessage = this.newMessage;
            const userMessageObj = { role: "user", content: userMessage }
            let activeChat = this.store.chats.filter(x => x.id === this.store.activeChatId)[0]
            const activeChatHasMessages = activeChat ? activeChat.messages : false
            if (activeChatHasMessages) {
                activeChat.messages.push(userMessageObj)
            }
            else {
                activeChat = {
                    id: this.store.activeChatId, name: "new chat", lastUpdated: Date.now().toString, messages: [userMessageObj]
                }
            }
            const postData = {
                // context_filter: {doc_ids: ["docId1", "docId2"]}, TODO enable via button
                include_sources: this.includeSources, // TODO show sources
                messages: activeChat.messages,
                stream: false, // TODO enable via button
                use_context: this.useContext
            };

            axios.post('http://localhost:8001/v1/chat/completions', postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => {
                    console.log(response.data);
                    const botResponse = response.data.choices[0].message
                    const storeChats = this.store.chats
                    const storeChatIds = storeChats.map(x => x.id)
                    console.log("store chat ids: ", storeChatIds);
                    const currentChatExists = storeChatIds.includes(this.store.activeChatId)
                    console.log("current chat exists: ", currentChatExists);


                    // Save message history here
                    if (currentChatExists) {
                        const activeChat = storeChats.filter(x => x.id === this.store.activeChatId)[0]
                        activeChat.messages.push(botResponse)// push bot response
                    }
                    else {
                        const newChat = { id: this.store.activeChatId, name: "new name", lastUpdated: "bla", messages: [userMessageObj, botResponse] }
                        storeChats.push(newChat)
                    }

                    this.newMessage = "" // Clear the input after sending

                    // -------------------------
                    this.$nextTick(() => {
                        this.scrollToBottom()
                    });
                })
                .catch(error => {
                    console.error('Error:', error)
                });


        },
        splitMessage(text) {
            const splitted = text.split("```")
            return splitted
        },
        isCode(text) {
            const splitText = text.split("\n")[0]
            const langSupported = hljs.getLanguage(splitText);
            return langSupported
        },
        scrollToBottom() {
            this.$refs.chatBot.scrollTop = this.$refs.chatBot.scrollHeight;
        },
    },
};
</script>
  
<style scoped>
.chat-window {
    width: 75%;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 20px;
    overflow-y: auto;
    height: 70vh;
    display: flex;
    flex-direction: column;
}

.chat-bot {
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.user-message {
    align-self: flex-end;
    background-color: #d3e0dc;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
    word-wrap: normal;
    text-align: left;
}

.bot-message {
    align-self: flex-start;
    background-color: #e3e3e3;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
    word-wrap: normal;
    text-align: left;
}

.message-input {
    margin-top: auto;
    display: flex;
    align-items: center;
}

.message-input-textbox {
    border-radius: 5px;
    padding: 8px;
}

.message-input input {
    flex: 1;
    margin-right: 10px;
}

.message-input button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
}

.active {
    /* border-color: #64ff8b; */
    background-color: #85f78983;
}
</style>
  