<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <router-view  />
 
</template>

<style>
/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  

} */

nav {

  color:rgb(245, 240, 240);
  
}

nav a {
  font-weight: bold;
 
}

nav a.router-link-exact-active {
  color:rgb(229, 93, 43);
}
body{
  background-color: rgb(236, 234, 234);
}
</style>
