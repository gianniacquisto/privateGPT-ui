<template>
    <div class="document-list">
        <div v-for="document in documentList" :key="document.id" class="document">
            {{ document.name }}
        </div>
        <div class="document-buttons">
            <button @click="addDocument">Add Document</button>
            <button @click="deleteDocument">Delete Document</button>
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
        deleteDocument() {
            // Assuming you have a function to make the API call to delete a document
            // Replace this with your actual API call
            this.deleteDocumentAPI().then((deletedDocumentId) => {
                this.documentList = this.documentList.filter(
                    (document) => document.id !== deletedDocumentId
                );
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
        deleteDocumentAPI() {
            // Make API call to delete a document
            // Return the ID of the deleted document from the API response
            return new Promise((resolve) => {
                // Mock API response for demonstration
                const deletedDocumentId = this.documentList.length;
                resolve(deletedDocumentId);
            });
        },
    },
};
</script>
  
<style scoped>
.document-list {
    width: 30%;
    padding: 20px;
    overflow-y: scroll;
    /* Allow vertical scrolling */
    height: 400px;
    /* Set a fixed height or adjust as needed */
    display: flex;
    flex-direction: column;
}

.document {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
    background-color: #e3e3e3;
}

.document-buttons {
    margin-top: auto;
    /* Push the buttons to the bottom */
}
</style>
  