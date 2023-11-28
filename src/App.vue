<template>
  <div id="app">
    <DocumentList />
    <ChatBot />
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
  height: 80vh;
  /* 100% of the viewport height */
  width: 100vw;
  /* 100% of the viewport width */
}
</style>
