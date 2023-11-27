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
            const newMessageObj = {
                id: this.chatMessages.length + 1,
                sender: "User",
                text: this.newMessage,
            };

            // Assuming you have a function to make the API call and handle the response
            // Replace this with your actual API call
            this.callLLMAPI(newMessageObj.text);

            this.chatMessages.push(newMessageObj);
            this.newMessage = ""; // Clear the input after sending
        },
        callLLMAPI(message) {
            // Make API call to your LLM with the message
            // Update the chatMessages with the response from the LLM
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
}</style>
  