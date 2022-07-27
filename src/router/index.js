import { createRouter, createWebHistory } from 'vue-router'
import  Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Detail from '../views/FoodDetail.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: Detail,
        props: true 
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        
    }, 
     {
        path: '/profile',
        name: 'profile',
        component: Signup,
        
    }, 
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router