<script setup>
import NavBar from '../components/NavBar.vue'
import ProfileSetting from '../components/ProfileSetting.vue'
import Footer from '../components/Footer.vue'
</script>
<template>
   <div class="">
    <NavBar></NavBar>
    <div class="flex min-w-full justify-center pt-32 mb-8">
       <div  class="profile   md:flex-row  flex flex-col"> 
       <div class="md:mr-8 m-0   bg-white shadow-lg  md:self-start pb-36">
         <div class="grid grid-cols-3 pt-2 ">
            <div class="flex  justify-center items-center">
              
               <i class="text-4xl text-orange-600  fa-solid fa-user"></i>
            </div> 
            <div class="sky uppercase w-44 col-span-2 font-mono font-bold text-md  ">
               Hi @samuel45
            </div>
         </div>
<div class="md:block  flex justify-evenly  ">
         <div class="py-3 flex justify-center l border-t-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600">
            <router-link  to="">Profile Setting</router-link>
         </div>
          <div class="py-3 flex justify-center l border-t-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600">
            <router-link  to="">Change password</router-link>
         </div>
          <div class="py-3 flex justify-center l border-t-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600">
            <router-link  to="">Recipes</router-link>
         </div>
          <div class="py-3 flex justify-center l border-t-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600">
            <router-link  to="">Create Recipes</router-link>
         </div>
          <div class="py-3 flex justify-center l border-t-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600">
            <router-link  to="">Bookmark</router-link>
         </div>
           <div class="py-3 flex justify-center l border-y-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600">
            <router-link  to="">Notfication</router-link>
         </div>
</div>    
        </div>
             
        
         <div class=" grow min-w-ful bg-white shadow-lg">
          <ProfileSetting class="min-w-full"></ProfileSetting>    
             

         </div>
      </div>
  </div>
  <Footer></Footer>
  <router-view></router-view>
  </div>
</template>


<style scoped>
.sky{
overflow-wrap: anywhere;
}

.profile{
   width:1300px;
}
label{
font-size: large;
font-weight: 600;
}

</style>