<template>
    <div class="document-window">
        <div>
            <h3>Ingested Files</h3>
        </div>

        <div class="document-list">
            <div v-for="file in fileList" class="document">
                {{ file }}
                <button class="delete-icon" @click="deleteDocument(file)">🗑️</button>
            </div>
        </div>
        <br>
        <div class="document-buttons">
            <button @click="addDocument">Add Document</button>
        </div>
    </div>
</template>
  
<script>

import axios from 'axios'

export default {
    data() {
        return {
            fileList: [],
            documentList: [],
        };
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            axios.get('http://localhost:8001/v1/ingest/list')
                .then(response => {
                    const proxyDocumentList = new Proxy(response.data.data, {
                        get(target, prop, receiver) {
                            return Reflect.get(target, prop, receiver)
                        },
                    })
                    this.documentList = proxyDocumentList
                    this.fileList = [...new Set(proxyDocumentList.map(x => x.doc_metadata.file_name))]
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
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
  