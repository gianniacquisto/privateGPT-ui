<template>
    <div class="chat-bot">
        <div v-for="message in chatMessages" :key="message.id" class="message"
            :class="{ 'user-message': message.sender === 'User', 'bot-message': message.sender === 'Bot' }">
            {{ message.sender }}: {{ message.text }}
        </div>
        <div class="message-input">
            <input v-model="newMessage" />
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
    },
};
</script>
  
 
<style scoped>
.chat-bot {
    width: 70%;
    border-right: 1px solid #ccc;
    padding: 20px;
    overflow-y: scroll;
    /* Allow vertical scrolling */
    height: 400px;
    /* Set a fixed height or adjust as needed */
    display: flex;
    flex-direction: column;
}

.message {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
}

.user-message {
    background-color: #d3e0dc;
}

.bot-message {
    background-color: #e3e3e3;
    text-align: right;
}

.message-input {
    margin-top: auto;
    /* Push the input and button to the bottom */
    display: flex;
    align-items: center;
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
  