import { createApp } from 'vue'
import App from './App'
import router from "@/router/router";
import components from '@/components/UI'
import mitt from "mitt"; 
export const emitter = mitt();


const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)    
});

app.config.globalProperties.emitter = emitter
app
    .use(router)
    .mount('#app')