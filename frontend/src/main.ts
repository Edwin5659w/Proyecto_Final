import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import './styles.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');