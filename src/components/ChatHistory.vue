<template>
    <div class="document-window">
        <div>
            <h3>Chat History</h3>
        </div>
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>
  
<script>


export default {
    props: ['modelValue'],
    emits: ['update:modelValue']
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
</style>