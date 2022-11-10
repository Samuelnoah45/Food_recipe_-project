import { createRouter, createWebHistory } from 'vue-router'
import  index from '../views/index.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Detail from '../views/FoodDetail.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/profile.vue'
import check from '../../Authentication/cookie';
import SearchResult from '../views/SearchResult.vue'
import edit from  '../views/editRecipe.vue'
import verification from '../views/verfication.vue'
import verifying from '../views/verifying.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: index,
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
        component: Profile,
        
  },
     {
        path: '/search',
        name: 'search',
        component: SearchResult,
        
    },
    {
        path: '/verification',
        name: 'verification',
        component: verification,
        
    }, {
        path: '/verifying',
        name: 'verifying',
        component: verifying,
        
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: edit,
        
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
     scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// router.beforeEach(async (to, from) =>
// {
//     const user = JSON.parse(localStorage.getItem("state"))
//      const  Authenticated=user.userStore.user.active;
//   if (
//     // make sure the user is authenticated else
      
//       !Authenticated &&
//       to.name !== 'Login' &&
//       to.name !== 'Signup' &&
//       to.name !== 'detail' &&
//       to.name !== 'Home'
//   ) {
//     // redirect the user to the login page
//     return { name: 'Login' }
//   }
    
//     if (
//     // make sure the user is logged out
      
//       Authenticated &&
//       to.name == 'Signup' 
     
//   ) {
//     // redirect the user to the login page
//     return { name:'profile' }
//     }
  
//    if (
//     // make sure the user is authenticated
      
//       Authenticated &&
//       to.name == 'Login'
     
//   ) {
//     // redirect the user to the login page
//     return { name:'profile' }
//   }
// })

export default router