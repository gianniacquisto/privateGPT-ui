<template>
    <div class="chat-window" ref="chatWindow">
        <div>
            <button @click="toggleIncludeSources" :class="{ 'active': includeSources }">Include Sources</button>
            <button @click="toggleUseContext" :class="{ 'active': useContext }">Use Context</button>
        </div>
        <br>
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />

        <div class="chat-bot" ref="chatBot">
            <div v-for="message in messages" :class="{
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

export default {
    data() {
        return {
            newMessage: "",
            messages: [],
            currentBotResponse: "",
            includeSources: false,
            useContext: true
        };
    },
    props: ['modelValue'],
    emits: ['update:modelValue'],
    methods: {
        toggleIncludeSources() {
            this.includeSources = !this.includeSources
        },
        toggleUseContext() {
            this.useContext = !this.useContext
        },
        sendMessage() {
            const userMessage = this.newMessage;
            const userMessageObj = { role: "user", content: userMessage }

            const postData = {
                // context_filter: {doc_ids: ["docId1", "docId2"]}, TODO enable via button
                include_sources: this.includeSources, // TODO show sources
                messages: [...this.messages, userMessageObj],
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

                    this.messages.push(userMessageObj);
                    this.newMessage = ""; // Clear the input after sending
                    this.currentBotResponse = response.data.choices[0].message
                    this.messages.push(this.currentBotResponse);

                    // Save message history here

                    this.$nextTick(() => {
                        this.scrollToBottom();
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
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
  