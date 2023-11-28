<template>
    <div class="document-window">
        <div>
            <h3>Ingested Documents</h3>
        </div>
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
            // TODO
            this.addDocumentAPI().then((newDocument) => {
                this.documentList.push(newDocument);
            });
        },
        deleteDocument(id) {
            // TODO
            this.deleteDocumentAPI(id).then(() => {
                this.documentList = this.documentList.filter((document) => document.id !== id);
            });
        },
        addDocumentAPI() {
            // TODO
            return new Promise((resolve) => {
                const newDocument = {
                    id: this.documentList.length + 1,
                    name: `Document ${this.documentList.length + 1}`,
                };
                resolve(newDocument);
            });
        },
        deleteDocumentAPI(id) {
            // TODO
            return new Promise((resolve) => {
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
    padding: 10px;
    overflow-y: auto;
    height: 70vh;
    display: flex;
    flex-direction: column;
}

.document-list {
    padding: 10px;
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
}
</style>
  