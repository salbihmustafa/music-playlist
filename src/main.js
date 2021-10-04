import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config';

// global styles
import './assets/main.css';

let app;

projectAuth.onAuthStateChanged(() => {
    if(!app){
        //if app doesn't already have a value then fire this function.
        app = createApp(App).use(router).mount('#app')
    }
    
});
