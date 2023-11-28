<template>
    <div class="chat-window" ref="chatWindow">
        <div class="chat-bot" ref="chatBot">
            <div v-for="message in chatMessages" :key="message.id" :class="{
                'user-message': message.sender === 'User',
                'bot-message': message.sender === 'Bot'
            }">
                {{ message.sender }}: {{ message.text }}
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
export default {
    data() {
        return {
            chatMessages: [],
            newMessage: "",
        };
    },
    methods: {
        sendMessage() {
            const userMessage = this.newMessage;
            const userMessageObj = {
                id: this.chatMessages.length + 1,
                sender: "User",
                text: userMessage,
            };

            // Assuming you have a function to make the API call and handle the response
            // Replace this with your actual API call
            this.callLLMAPI(userMessage);

            this.chatMessages.push(userMessageObj);
            this.newMessage = ""; // Clear the input after sending

            // Simulate a random response from the bot
            const botResponse = this.generateRandomResponse();
            const botResponseObj = {
                id: this.chatMessages.length + 1,
                sender: "Bot",
                text: botResponse,
            };

            this.chatMessages.push(botResponseObj);

            // Scroll to the bottom after adding new messages
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },

        callLLMAPI(message) {
            // Make API call to your LLM with the message
            // Update the chatMessages with the response from the LLM
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
            // Scroll to the bottom of the chat-bot
            this.$refs.chatBot.scrollTop = this.$refs.chatBot.scrollHeight;
        },
    },
};
</script>
  
<style scoped>
.chat-window {
    width: 70%;
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
  