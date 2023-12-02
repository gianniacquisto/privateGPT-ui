<template>
    <div class="chat-window" ref="chatWindow">
        <div class="chat-bot" ref="chatBot">
            <div v-for="message in messages" :class="{
                'user-message': message.role === 'user',
                'bot-message': message.role === 'assistant'
            }">
                {{ message.role }}: {{ message.content }}
            </div>
        </div>
        <br />
        <div class="message-input">
            <input class="message-input-textbox" v-model="newMessage" @keyup.enter="sendMessage" />
            <button @click="sendMessage">Send Message</button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            // chatMessages: [],
            newMessage: "",
            messages: [],
            currentBotResponse: ""
        };
    },
    methods: {
        sendMessage() {
            const userMessage = this.newMessage;
            const userMessageObj = { role: "user", content: userMessage }

            const postData = {
                // context_filter: {doc_ids: ["docId1", "docId2"]}, TODO enable via button
                include_sources: false, // TODO enable via button
                messages: [...this.messages, userMessageObj],
                stream: false, // TODO enable via button
                use_context: true // TODO enable via button
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
                    // this.chatMessages.push(this.currentBotResponse.content);


                    this.$nextTick(() => {
                        this.scrollToBottom();
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });


        },

        generateRandomResponse() {
            const responses = [
                "I'm not sure what you mean.",
                "That's interesting!",
                "Tell me more about that.",
                "I'm still learning!",
                "Could you rephrase that?",
                "I don't have the answer to that question.",
            ];
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
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
}

.bot-message {
    align-self: flex-start;
    background-color: #e3e3e3;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
    word-wrap: normal;
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
</style>
  