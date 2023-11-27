<template>
  <div id="app">
    <ChatBot />
    <DocumentList />
  </div>
</template>

<script>
import ChatBot from "./components/ChatBot.vue";
import DocumentList from "./components/DocumentList.vue";

export default {
  components: {
    ChatBot,
    DocumentList,
  },
};
</script>

<style>
#app {
  display: flex;
}
</style>
