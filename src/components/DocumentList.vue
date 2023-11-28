<template>
    <div class="document-window">
        <div class="document-list">
            <div v-for="document in documentList" :key="document.id" class="document">
                {{ document.name }}
                <button class="delete-icon" @click="deleteDocument(document.id)">🗑️</button>
            </div>
        </div>
        <br>
        <div class="document-buttons">
            <button @click="addDocument">Add Document</button>
        </div>
    </div>
</template>
  
<script>


export default {
    data() {
        return {
            documentList: [],
        };
    },
    methods: {
        addDocument() {
            // Assuming you have a function to make the API call to add a document
            // Replace this with your actual API call
            this.addDocumentAPI().then((newDocument) => {
                this.documentList.push(newDocument);
            });
        },
        deleteDocument(id) {
            // Assuming you have a function to make the API call to delete a document
            // Replace this with your actual API call
            this.deleteDocumentAPI(id).then(() => {
                this.documentList = this.documentList.filter((document) => document.id !== id);
            });
        },
        addDocumentAPI() {
            // Make API call to add a document
            // Return the new document object from the API response
            return new Promise((resolve) => {
                // Mock API response for demonstration
                const newDocument = {
                    id: this.documentList.length + 1,
                    name: `Document ${this.documentList.length + 1}`,
                };
                resolve(newDocument);
            });
        },
        deleteDocumentAPI(id) {
            // Make API call to delete a document
            // Return the response from the API
            return new Promise((resolve) => {
                // Mock API response for demonstration
                console.log(`Deleting document with ID ${id}`);
                resolve();
            });
        },
    },
};
</script>
  
<style scoped>
.document-window {
    width: 30%;
    padding: 20px;
    overflow-y: auto;
    height: 78vh;
    display: flex;
    flex-direction: column;
}

.document-list {
    padding: 20px;
    overflow-y: auto;
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

.delete-icon {
    position: sticky;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    color: #ca5252;
}

.document-buttons {
    margin-top: auto;
    /* Push the buttons to the bottom */
}
</style>
  