<template>
    <div class="document-window">
        <div>
            <h3>Chat History</h3>
        </div>
        <div v-for="chat in history" class="document"> {{ chat.name }} </div>
    </div>
</template>
  
<script>


export default {
    props: ['history'],
    emits: ['update:history']
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