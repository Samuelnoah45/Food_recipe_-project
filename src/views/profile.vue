<script setup>
import NavBar from '../components/NavBar.vue'
import Edit from '../components/ProfileSetting.vue'
import Footer from '../components/Footer.vue'
import AddRecipe from '../components/AddRecipe.vue'
import { ref } from 'vue'
let comp = ref(Edit)
let activeBtn=ref('btn1')

</script>
<template>
   <div class="">
    <NavBar></NavBar>
    <div class="flex min-w-full justify-center pt-32 mb-8">
       <div  class="profile   md:flex-row  flex flex-col"> 
       <div class="md:mr-8 m-0   bg-white shadow-lg  md:self-start md:pb-36 pb-2">
         <div class="grid grid-cols-3 pt-2 ">
            <div class="flex  justify-center items-center">
               <i class="text-4xl text-orange-600  fa-solid fa-user"></i>
            </div> 
            <div class="sky uppercase w-44 col-span-2 font-mono font-bold text-md  ">
               Hi @samuel45
            </div>
         </div>
  <div class="md:block  flex justify-evenly  ">
        <button @click="comp=Edit ,activeBtn = 'btn1'" :class="{active: activeBtn === 'btn1' }" class="md:text-lg min-w-full md:font-bold md:flex-row flex-col py-3 flex justify-start md:pl-10 p-1 space-x-4 md:border-t-2 border-y-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600"  to="">
            <span class="text-2xl self-center"><i class="fa-solid fa-user-pen"></i></span>
            <span class="md:text-lg min-w-full text-xs">Edit account</span>
         </button>
          <button @click="comp=Recipes ,activeBtn = 'btn2'" :class="{active: activeBtn === 'btn2' }" class="md:text-lg min-w-full md:font-bold md:flex-row flex-col py-3 flex justify-start md:pl-10 p-1 space-x-4 md:border-t-2 border-y-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600"  to="">
            <span class="text-2xl self-center"><i class="fa-solid fa-gear"></i></span>
            <span class="md:text-lg min-w-full text-xs">My Recipes</span>
         </button>
         <button  @click="comp=AddRecipe ,activeBtn = 'btn3'" :class="{active: activeBtn === 'btn3' }" class="md:text-lg min-w-full md:font-bold md:flex-row flex-col py-3 flex justify-start md:pl-10 p-1 space-x-4 md:border-t-2 border-y-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600"  to="">
            <span class="text-2xl self-center"><i class="fa-solid fa-plus"></i></span>
           <span class="md:text-lg min-w-full text-xs">Add Recipe</span>
         </button>
          <button @click="comp=Bookmark,activeBtn = 'btn4'" :class="{active: activeBtn === 'btn4' }" class="md:text-lg min-w-full md:font-bold md:flex-row flex-col py-3 flex justify-start md:pl-10 p-1 space-x-4 md:border-t-2 border-y-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600"  to="">
            <span class="text-2xl self-center"><i class="fa-solid fa-bookmark"></i></span>
            <span class="md:text-lg min-w-full text-xs">Bookmark</span>
         </button>
          
         <button @click="comp=Notfication,activeBtn = 'btn5'" :class="{active: activeBtn === 'btn5' }" class="md:text-lg min-w-full md:font-bold md:flex-row flex-col py-3 flex justify-start md:pl-10 p-1 space-x-4 md:border-t-2 border-y-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600"  to="">
            <span class="text-2xl self-center"><i class="fa-solid fa-bell"></i></span>
            <span class="md:text-lg min-w-full text-xs">Notfication</span>
         </button>
         <button @click="comp=favorite ,activeBtn = 'btn6'" :class="{active: activeBtn === 'btn6' }"  class="md:text-lg min-w-full md:font-bold md:flex-row flex-col py-3 flex justify-start md:pl-10 p-1 space-x-4 md:border-t-2 border-y-2 border-gray-300h hover:bg-gray-300 hover:text-orange-600"  to="">
            <span class="text-2xl self-center"><i class="fa-brands fa-gratipay"></i></span>
            <span class="md:text-lg min-w-full text-xs">favorite</span>
         </button>
         <div id="toolBtns">
<div class="btn-group" role="group" id="toolBtns">
  <button class="btn" type="button" @click="activeBtn = 'btn1'" :class="{active: activeBtn === 'btn1' }">Btn1</button>
  <button class="btn" type="button" @click="activeBtn = 'btn2'" :class="{active: activeBtn === 'btn2' }">Btn2</button>
  <button class="btn" type="button" @click="activeBtn = 'btn3'" :class="{active: activeBtn === 'btn3' }">Btn3</button></div>
</div>
    </div> 
     
        </div>
         <div class=" grow min-w-ful bg-white ">
          <!-- <ProfileSetting class="min-w-full"></ProfileSetting>     -->
          <!-- <AddRecipe class="min-w-full"></AddRecipe> -->
          <component class="min-w-full" :is="comp" />
         


   
</div>
</div>
  </div>
  <Footer></Footer>
  </div>
  <router-view></router-view>
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
.active{
  color:#ea580c;
}


</style>