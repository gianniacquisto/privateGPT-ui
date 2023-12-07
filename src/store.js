import { reactive, watch } from 'vue'

export const store = reactive({
    chats: [],
    activeChatId: "",
    newChatSwitch: false
})

// Watch for changes in the store and update localStorage
watch(() => store, () => {
    localStorage.setItem('myAppStore', JSON.stringify(store))
}, { deep: true })

// Load the initial state from localStorage (if available)
const storedState = localStorage.getItem('myAppStore')
if (storedState) {
    Object.assign(store, JSON.parse(storedState))
}