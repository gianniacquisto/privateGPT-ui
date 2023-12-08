import { reactive, watch } from 'vue';

// Create a reactive store
export const store = reactive({
    chats: [],
    ingestedDocuments: [],
    activeChatId: "",
    selectedFiles: new Set(),
    newChatSwitch: false,
    chatIsHidden: false,
    documentListIsHidden: false
});

// Watch for changes in the store and update localStorage
watch(() => store, () => {
    try {
        const stateToSave = { ...store, selectedFiles: Array.from(store.selectedFiles) };
        localStorage.setItem('privateGPTStore', JSON.stringify(stateToSave));
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
}, { deep: true });

// Load the initial state from localStorage (if available)
const storedState = localStorage.getItem('privateGPTStore');
if (storedState) {
    try {
        const parsedState = JSON.parse(storedState);

        // Only update properties that exist in the store
        for (const key in parsedState) {
            if (store.hasOwnProperty(key)) {
                if (key === 'selectedFiles' && Array.isArray(parsedState[key])) {
                    store[key] = new Set(parsedState[key]);
                } else {
                    store[key] = parsedState[key];
                }
            }
        }
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
    }
}
