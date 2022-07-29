<script setup>
import { ref } from 'vue';
import  Navbar from "../components/NavBar.vue"


</script>

<template>
<Navbar></Navbar>
<div class="flex  justify-center pt-24  mb-8">
  <div  class="profile p-8  flex flex-col space-y-10 ">
    <div class="flex flex-col space-y-10">
      <div class="text-4xl text-black font-mono font-bold">lemon Zucchini Bread</div>
      <div class="flex  space-x-4">
        <span class="text-orange-600">
          <i class="fa-solid fa-star"  ></i>
          <i class="fa-solid fa-star"  ></i>
          <i class="fa-solid fa-star"  ></i>
          <i class="fa-solid fa-star"  ></i>
        </span>
        <span>
          617 Reating 
        </span>
        <span>
          378 Reviwes
        </span>
      </div>
      <div>
       Lorem ipsum dolor sit 
       amet consectetur adipisicing elit.
       Maiores praesentium velit dolorem nesciunt
         et similique beatae optio maxime natus rerum 
         pariatur deleniti exercitationem molestiae, ab, 
         quae perspiciatis facilis neque dignissimos.
      </div>
      <div class="flex space-x-5"><i class="text-4xl fa-solid fa-circle-user"></i>
         <span class="self-center">Recipe by samuel noah</span></div>
    </div>    

    <div class="flex md:space-x-10 border-b-2 border-gray-400 pb-11 space-y-10 md:space-y-0 md:flex-row flex-col">
       <div class="basis-1/7 md:block flex">
         <div class="items-center flex flex-col  p-4 hover:text-orange-600">
            <i class="fa-solid fa-bookmark"></i>
          <span>save</span>
        </div>
         <div class="items-center flex flex-col  p-4 hover:text-orange-600">
           <i class="fa-regular fa-star"></i>
          <span>Rate</span>
        </div>
         <div class="items-center flex flex-col  p-4 hover:text-orange-600">
           <i class="fa-regular fa-thumbs-up"></i>
         
          <span>like</span>
        </div>
       </div>

       <div class="basis-3/5">
         <img class="object-cover rounded  w-full " src="../assets/Foods/food1.jpg" alt="">
       </div>
       <div class="flex-1 relative flex flex-col p-4 rounded text-lg  border-2 border-gray-400 space-y-3">
        <div class="text-xl font-bold self-center  text-orange-600">Quick facts</div>
       <div> 24 min</div> 
       <div> 5 ingredients</div> 
       <div> category of dinner</div> 
       </div>

    </div>

    <div class="flex md:flex-row flex-col md:space-y-0 space-y-10">
      <!-- ingredien -->
      <div class="grid grid-cols-2 gap-y-4 gap-x-4 p-3 self-start basis-1/2">
        <div class="col-span-2 flex justify-center text-2xl font-bold"><span>Ingredients</span></div>
         <div class="flex space-x-3"><i class="fa-solid fa-spoon"></i><span>Lorem ipsum dolor sit.</span></div>
         <div class="flex space-x-3"><i class="fa-solid fa-spoon"></i><span>Lorem ipsum dolor sit amet consectetur..</span></div>
       
         

      </div>
      <!--steps  -->
      <div class="flex flex-col  space-y-8">
        <div class="text-2xl font-bold self-center ">Steps</div>
         <div class="flex flex-col space-y-3">
           <div class="flex space-x-3  ">
             <i class="self-center text-2xl font-bold text-orange-600 fa-regular fa-circle-check"></i> 
             <span class="text-xl font-bold">step 1</span>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, omnis.</div>
        </div>
         <div class="flex flex-col space-y-3">
           <div class="flex space-x-3  ">
             <i class="self-center text-2xl font-bold text-orange-600 fa-regular fa-circle-check"></i> 
             <span class="text-xl font-bold">step 2</span>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, omnis.</div>
        </div>
         <div class="flex flex-col space-y-3">
           <div class="flex space-x-3  ">
             <i class="self-center text-2xl font-bold text-orange-600 fa-regular fa-circle-check"></i> 
             <span class="text-xl font-bold">step 1</span>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, omnis.</div>
        </div>
        <div class="flex flex-col space-y-3">
           <div class="flex space-x-3  ">
             <i class="self-center text-2xl font-bold text-orange-600 fa-regular fa-circle-check"></i> 
             <span class="text-xl font-bold">step 1</span>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, omnis.</div>
        </div>
      </div>
    </div>
  </div>

</div>

</template>
<style scoped>
.profile{
   width:1000px;
}
</style>