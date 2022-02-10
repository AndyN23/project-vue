// import { createApp } from 'vue'
// import App from '@/App'    
// import { ssrContextKey } from "vue";
// import Main from "@/pages/Main"
import { createRouter, createWebHistory } from "vue-router"    

// const routes = [        
//     {            
//         path : "/",            
//         component : App,
//     },
// ]    
const router = createRouter({        
    history : createWebHistory(process.env.BASE_URL),      
    routes: [
        // { 
        //   path: '/:catchAll(.*)', 
        //   component: ;NotFoundComponent,
        //   name: 'NotFound'
        // }
    ]
})    
    
export default router;