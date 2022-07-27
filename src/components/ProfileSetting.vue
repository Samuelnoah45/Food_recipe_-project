<script setup>
import { useUserStore } from '../store/userInfo'
const userStore = useUserStore();


</script>
<template>
  <div class="max-w-fit">
        <div class="grow h-screen flex-none bg-white shadow-lg">
              <!-- //profile setting -->
             <div  class="flex justify-between p-8">
                 <div class="text-3xl font-serif text-black font-bold">Profile Settings</div>
                 <div class="bg-orange-600 flex justify-center items-center text-white p-2 rounded shadow-md">
                  <button  disabled class="">Save Change</button></div>
             </div>
             <div class="p-8 ">
               <div class="text-3xl flex  justify-between font-serif text-black font-bold border-2 p-4">
                  <div>
                    About Me
                  </div>
                  <div class="">
                      <i class="fa-solid fa-circle-chevron-down"></i>
                  </div>
               </div>
               <div class="border-x-2 border-b-2 p-6 md:flex-row flex-col flex space-x-4 w-full">
                  <div  class="flex-1 space-y-10">
                     <div class="flex flex-col ">
                         <label for="name">Full Name</label>
                        <input  class="border-2 p-2 border-gray-300"  type="text" :value="userStore.user.name">
                     </div>
                      <div class="flex flex-col">
                        <label for="name">Email</label>
                        <input class="border-2 p-2 border-gray-300" disabled type="text" :value="userStore.user.email">
                     </div>
                  </div>
                  <div  class="flex-1 ">
                     
                  </div>
                  
               </div>
             </div>

             <div class="p-8 ">
               <div class="text-3xl flex   justify-between font-serif text-black font-bold border-2 p-4">
                  <div>
                    Mocial Media Account
                  </div>
                  <div class="">
              <i class="fa-solid fa-circle-chevron-down"></i>
                  </div>
               </div>
               
               <div class="border-x-2 border-b-2 p-6 md:flex-row flex-col flex space-x-4 w-full">
                  <div  class="flex-1 space-y-10">
                     <div class="flex flex-col">
                         <label for="name">Facebook</label>
                        <input  class="border-2 p-2 border-gray-300"  type="text" value="samuel noah">
                     </div>
                      <div class="flex flex-col">
                         <label for="name">Instagram</label>
                        <input class="border-2 p-2 border-gray-300" type="text" value="@samuel45">
                     </div>
                     
                  </div>
                 <div  class="flex-1 space-y-10">
                     <div class="flex flex-col">
                         <label for="name">Twitter</label>
                        <input  class="border-2 p-2 border-gray-300"  type="text" value="samuel noah">
                     </div>
                      <div class="flex flex-col">
                         <label for="name">Telegram</label>
                        <input class="border-2 p-2 border-gray-300" type="text" value="@samuel45">
                     </div>
                     
                  </div>
                  
               </div>
             </div>
             

         </div>
  </div>
</template>


<style>
label{
font-size: large;
font-weight: 600;
}
</style>