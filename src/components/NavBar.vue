<script setup>
import {
    ref,
    onMounted,
    onUpdated
} from "vue";
import authentication from '../../Authentication/cookie';
import {
    useUserStore
} from '../store/userInfo'
import {
    useRouter,
    useRoute,
    onBeforeRouteLeave
} from 'vue-router'

const router = useRouter();
const userInfo = useUserStore()
const menubar = ref("block")
const close = ref("hidden")
const show = ref(false)
const haveUser = ref(false);

function logout() {
    userInfo.reset();
    userInfo.setPage(1)
    router.push({
        path: '/login'
    })

}

function mobile_dropdown() {

    let btn = document.querySelector("#mobile-menus")
    btn.classList.toggle("hidden")
    if (menubar.value == "hidden") {
        menubar.value = "block"
        close.value = "hidden"
    } else {
        close.value = "block"
        menubar.value = "hidden"
    }

}
const pushToProfile=()=>{
router.push({path:'/profile'})

}
</script>

<template>
<div id="navbar" class="fixed z-20 w-full app_nav">
    <nav class=" bg-white border-gray-300 px-2 sm:px-6 py-2.5  shadow-lg ">

        <div class=" flex   justify-between w-full p-4  text-gray-700" id="mobile-menus">
            <div class="flex  flex-g text-md ">
               
                <div class="ml-6 self-center font-sans font-bold text-2xl text-orange-600"><span>
                        <router-link   to="/">SkyRecipe <i class="fa-solid fa-utensils"></i></router-link>
                    </span>
                </div>
            </div>
            <div>
                <ul class="flex align-middle space-x-4 ">

                    <li>
                        <slot></slot>
                    </li>
                    <li v-if="!userInfo.user.active">
                        <router-link id="signup" to="/signup">sign up</router-link>
                    </li>
                    <li v-if="!userInfo.user.active">
                        <router-link to="/login">sign in</router-link>
                    </li>
                    <li v-if="userInfo.user.active">
                       <img  @click="pushToProfile" class="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" :src="userInfo.user.image" alt="">
                        <router-link to="/profile"></router-link>
                    </li>
                    <li class="self-center" v-if="userInfo.user.active">
                        <router-link @click="logout" to="/login">logout</router-link>
                    </li>
                </ul>
            </div>
        </div>

    </nav>
    <router-view></router-view>
</div>
</template>

<style scoped>
.sreach-box {

    cursor: pointer;

}

.sreach-box:hover>input {
    width: 200px;
    padding: 0 10px;

}

.sreach-box:hover>.icon {
    background: none;

}

.icon:hover {
    transform: rotate(360deg) scale(1);

}

input {
    width: 0;
    border-radius: 20px;
    outline: none;
    padding: 0;
    margin: 0 10px;
    background: white;
    font-size: 1.1rem;
    transition: 0.5s ease;
    line-height: 40px;
    color: #42b983;
    ;
}

.icon {
    color: #42b983;
    float: right;
    width: none;
    font-size: 1.5rem;
    height: 30px;
    display: flex;
    justify-content: center;
    transition: 0.4s;
    /* cursor: pointer; */
    text-decoration: none;

}
</style>>
