import { createApp } from 'vue';
import App from './App.vue';
import * as Sentry from "@sentry/vue";


  
const app = createApp(App);


app.mount('#app');
