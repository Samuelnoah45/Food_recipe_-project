/* eslint-disable no-unused-vars */
<script setup>
import { ref } from 'vue';
const variables  = ref({})
var x = 10
console.log(x);
const  submitForm = function(){

return false

}

  
 
</script>

<template>
    <div class="flex justify-center self-center z-10">
          <div class="p-8 bg-white mx-auto w-96 rounded-3xl w-100">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">Sign up</h3>
              <p class="text-gray-500">Please fill the from to register.</p>
            </div>
          <form  @submit="submitForm">
            <div class="space-y-3">
              <div class="space-y-1 flex flex-col">
                <label for="fullName"  class=" text-lg font-medium text-gray-700 tracking-wide"> Full Name </label>
                <input type="text" name="fullName" id="name" v-model="variables.name"  placeholder="Enter full name" class="px-4 py-2 w-full text-base border border-gray-300  rounded " />
              </div>

              <div class="space-y-1 flex flex-col">
                <label class="text-lg font-medium text-gray-700 tracking-wide" >Email</label>
                <input type="email" name="email" id="email" v-model="variables.email"  class="   w-full text-base px-4 py-2  border border-gray-300 rounded-lg  focus:outline-none focus:border-orange-400"  placeholder="mail@gmail.com"/>
              </div>
              <div class="space-y-1 flex flex-col">
                <label class="text-lg font-medium text-gray-700 tracking-wide"> Password
                </label>
                <input type="password" name="password" id="password" v-model="variables.password"   class="w-full   content-center   text-base   px-4   py-2   border border-gray-300   rounded-lg focus:outline-none focus:border-orange-400"  placeholder="Enter your password"/>
              </div>
              <div class="space-y-1 flex flex-col">
                <label  class="text-lg font-medium text-gray-700 tracking-wide" >confirm </label>
                <input name="confirm"  id="confirm-password"  class="w-full content-center text-base   px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400" type="password" placeholder="confirm your password"/>
              </div>

              <div  class="flex justify-center">
                 <button   type="button"  class="w-44 flex justify-center bg-orange-400 hover:bg-orange-500 text-gray-100  p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-400"> 
                    Sign up
                    <!-- <span  class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                 </span> -->
                </button>
              </div>
            </div>
              </form>
            <div class="mt-4">
              <p class="hover:text-orange-500 text-orange-400">
                <a to="/login">Have already an account</a>
              </p>
            </div>
            <div class="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" class="text-orange hover:text-orange-500">sky</a ></span >
            </div>
          </div>
        </div>
</template>