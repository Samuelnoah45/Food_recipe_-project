<script setup>
import { ref } from "vue";
defineProps({
   result:Object,
})
    const x=ref();
    
    // const foods = ref(props.foods);
    const foodImage = "../image/homepage.jpg";
    

</script>

<template>
  <div class="md:grid-cols-3 md:grid">
 
    <div v-for="food in result.food" :key="food" class="p-1 ="  >
    
      <div  class="md:block grid grid-cols-3 bg-white  rounded-b-lg m-4 shadow-xl bg-gray-">
        <div class=" w-full max-h-48 max-w-lg   h-64 rounded-lg shadow-2xl overflow-hidden relative">
          <img class="absolute inset-0 min-h-full object-cover " src="../assets/images/homepage.jpg" alt="" />
          <div class="absolute inset-0  bg-black bg-opacity-30"></div>
          <div class="absolute inset-0 ">
            <div class="flex justify-center text-2xl text-white text-right  items-center mt-3 ml-4 h-10 w-10 bg-orange-700  rounded-full">
              <i class="fa-solid fa-heart"></i>
           </div>
          </div>
          <div class="flex h-full items-center justify-center relative"></div>
        </div>

        <div class="col-span-2">
          <div class="text-xl font-extrabold p-2"><router-link class="hover:underline " :to="{ name: 'detail', params: { id:food.id }}">{{food.title }}</router-link> </div>
         <div class=" text-md font-extrabold p-2 flex justify-between">
           <span class="self-start">
             {{food.category }}
           </span>
           <span class="space-x-2">
            <i class="fa-solid fa-clock"></i><span>{{food.duration}}min</span>
           </span>
        </div>
         <div class="text-left text-lg flex flex-col ">
           <div class="text-left text-sm text-orange-600 my-2 px-2 " :set="(averageRate =food.ratings[0].totalRating / food.ratings[0].numberOfRating)" >
               <span class="text-gray-500 pr-2">Rating</span >
                 <span  v-for="n in 5" :key="n">
                   <i class="fa-solid fa-star" v-if="n <= averageRate" ></i>
                   <!-- <font-awesome-icon icon="fa-solid fa-star"  /> -->
                   <i class="fa-solid fa-star-half-stroke" v-if=" averageRate < 5 && averageRate - n < 1 && averageRate > n"></i>
 
                 </span>
            </div>
           <div class="self-end mb-2"><p class="text-sm px-2 ">created by <span class="font-serif font-bold">{{food.user.name}}</span></p></div>

          </div>
    

        </div>
        
       
     
      </div>
    </div>
  </div>
</template>



<style>
.bg {
  background: linear-gradient(
    60deg,
    rgb(142,252,233) 10%,
    rgb(88,161,230) 50%,
    rgb(185,147,243	) 100%
  );
}
</style>
