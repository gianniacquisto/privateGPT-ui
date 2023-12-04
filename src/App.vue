<template>
  <div id="app">
    <div class="title-banner">
      <h1>Private GPT</h1>
    </div>
    <br>
    <div class="content-container">
      <ChatHistory v-model:history="chatHistory" />
      <ChatBot v-model:history="chatHistory" />
      <DocumentList />
    </div>
  </div>
</template>

<script>
import ChatBot from "./components/ChatBot.vue";
import ChatHistory from "./components/ChatHistory.vue";
import DocumentList from "./components/DocumentList.vue";

export default {
  data() {
    return {
      chatHistory: [{ id: "1", name: "history test 1", messages: [] }]
    }
  },
  components: {
    ChatBot,
    ChatHistory,
    DocumentList
  },
};
</script>

<style>
#app {
  display: flex;
  padding: 10px;
  width: 95vw;
  flex-direction: column;
}

.title-banner {
  background-color: mediumpurple;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
}

.title-banner h1 {
  margin: 0;
  font-size: 24px;
}

.content-container {
  display: flex;
  flex: 1;
}
</style>
