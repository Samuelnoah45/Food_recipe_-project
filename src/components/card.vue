<script setup>
import { ref } from "vue";
defineProps({
   result:Object,
})
    const x=ref();
    
    // const foods = ref(props.foods);
    const foodImage = "../image/homepage.jpg";
    // console.log(foods);

</script>

<template>
  <div class="md:grid-cols-3 md:grid">
    <div v-for="food in result.food" :key="food" class="p-1 ="  >
      <div  class="md:block grid grid-cols-3  rounded-b-lg m-4 shadow-xl bg-gray-">
        <div class=" w-full max-h-48 max-w-lg   h-64 rounded-lg shadow-2xl overflow-hidden relative">
          <img class="absolute inset-0 min-h-full object-cover " src="../assets/images/homepage.jpg" alt="" />
          <div class="absolute inset-0  bg-black bg-opacity-30"></div>
          <div class="absolute inset-0 ">
            <div class="flex justify-center items-center mt-3 ml-4 h-10 w-10 bg-orange-700  rounded-full">
              <font-awesome-icon class="text-2xl text-white text-right " icon="fa-solid fa-heart" />
           </div>
          </div>
          <div class="flex h-full items-center justify-center relative"></div>
        </div>

        <div class="col-span-2">
         <div class=" text-xl font-extrabold p-2">{{food.title }}</div>
         <div class="text-sm font-extrabold p-2">{{food.title }}</div>
         <div class="text-left text-lg flex flex-col ">
           <div><p class="text-sm px-2 ">created by <span>wdnc wencn</span></p></div>
            <div class="text-left text-sm text-orange-600 my-2 px-2 " :set="(averageRate =food.ratings[0].totalRating / food.ratings[0].numberOfRating)" >
               <span class="text-gray-500 pr-2">Rating</span >
                 <span  v-for="n in 5" :key="n">
                   <font-awesome-icon icon="fa-solid fa-star" v-if="n <= averageRate"  />
                   <font-awesome-icon icon="fa-solid fa-star-half" v-if=" averageRate < 5 && averageRate - n < 1 && averageRate > n"/>
                 </span>
            </div>
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
