<template>
    <button @click="toggleVisibility" class="toggle-component-button">
        {{ store.documentListIsHidden ? '◄' : '►' }}
    </button>
    <div v-show="!this.store.documentListIsHidden" class="document-window">
        <div>
            <h3>Ingested Files</h3>
        </div>

        <div v-for="file in  fileList " :class="{ 'selected-file': isFileSelected(file), document: true }"
            @click="toggleFileInContext(file)">
            {{ file }}
            <button class="delete-icon" @click="deleteFile(file)">🗑️</button>
        </div>
        <br>
        <div class="document-buttons">
            <button @click="openFileSelector">Add File(s)</button>
            <input ref="fileInput" type="file" style="display: none" multiple @change="addFile">
        </div>
    </div>
</template>
  
<script>
import { store } from '../store';
import axios from 'axios'

export default {
    data() {
        return {
            store,
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
                    console.log(proxyDocumentList);
                    this.fileList = [...new Set(proxyDocumentList.map(x => x.doc_metadata.file_name))]
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        openFileSelector() {
            // Trigger click on the hidden file input
            this.$refs.fileInput.click();
        },
        addFile(event) {
            const filesToAdd = event.target.files;
            console.log('Adding files:', filesToAdd);

            const formData = new FormData();
            for (let i = 0; i < filesToAdd.length; i++) {
                formData.append('file', filesToAdd[i]);
            }
            axios.post('http://localhost:8001/v1/ingest', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log("posting formdata", response.data);
                    this.fetchData()
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        },
        toggleFileInContext(file) {
            if (this.store.selectedFiles.has(file)) {
                // file is selected and we want to deselect
                this.store.selectedFiles.delete(file)
                console.log(`Removing file: ${file} from context`);
                console.log(this.store.selectedFiles);
            }
            else {
                this.store.selectedFiles.add(file)
                console.log(`Adding file: ${file} to context`);
                console.log(this.store.selectedFiles);
            }
        },
        isFileSelected(file) {
            return this.store.selectedFiles.has(file)
        },
        deleteFile(file) {
            const docsToDelete = this.documentList.filter((document) => document.doc_metadata.file_name == file)
            const docIdsToDelete = docsToDelete.map(x => x.doc_id)
            console.log("docIdsToDelete", docIdsToDelete);
            for (let i = 0; i < docIdsToDelete.length; i++) {

                axios.delete(`http://localhost:8001/v1/ingest/${docIdsToDelete[i]}`, {
                    headers: {
                        'Accept': 'application/json',
                    },
                })
                    .then(response => {
                        console.log(`Deleted document with id: ${docIdsToDelete[i]}, progress: ${i + 1}/${docIdsToDelete.length}`);
                        // this.fetchData() FIXME: this very spammy for now but deletion works - perhaps look into Promise.all
                    })
                    .catch(error => {
                        console.error('Error deleting document:', error);
                    });

            }
        },
        toggleVisibility() {
            this.store.documentListIsHidden = !this.store.documentListIsHidden;
        }
    },
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

.selected-file {
    background-color: #aaa9a9;
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
  