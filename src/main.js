import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'highlight.js/styles/stackoverflow-light.css'
import hljsVuePlugin from "@highlightjs/vue-plugin";
import 'highlight.js/lib/common';

createApp(App).use(hljsVuePlugin).mount('#app')
