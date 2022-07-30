<script setup>
import Navbar from "../components/NavBar.vue"
import Footer from '../components/Footer.vue'
import RecipeDetail from '../graphql/query/recipeDetail.gql'
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ref,computed } from 'vue';



const router = useRouter()
const food_Id = ref({
  id:18
})
food_Id.value=parseInt(router.params.id)

const { result, onResult, onError } = useQuery(RecipeDetail, {
  id:parseInt(router.params.id)
} )

onResult(() =>
{

  const detail = computed(() => result.value?.users ?? [])
 

  
})

 
  onError(( err ) => {
  console.log(err);
  });

</script>

<template>
<Navbar></Navbar>
<div  v-if="result"  class="flex  justify-center pt-24  mb-8">
  <div  class="profile p-8  flex flex-col space-y-10 ">
    <div  class="flex flex-col space-y-10">
      <div v-if="result" class="text-4xl text-black font-mono font-bold"> {{result.food[0].title}}</div>
      <div class="flex  space-x-4" :set="(averageRate =result.food[0].reviews_aggregate.aggregate.avg.rating)">
           <div v-if="averageRate">
                 <span  v-for="n in 5" :key="n">
                   <i class="fa-solid fa-star" v-if="n <= averageRate" ></i>
                   <i class="fa-solid fa-star-half-stroke" v-else-if="n-averageRate < 1 && n- averageRate >0"></i>
                   <i class="fa-regular fa-star" v-else-if="n-averageRate"></i>
                 </span>
              </div>
        <span>
         {{result.food[0].reviews_aggregate.aggregate.count}} Rating 
        </span>
        <span>
         {{result.food[0].reviews_aggregate.aggregate.count}} Reviwes
        </span>
      </div>
      <div>
    {{result.food[0].description}}
      </div>
      <div class="flex space-x-5"><i class="text-4xl fa-solid fa-circle-user"></i>
         <span class="self-center">Recipe by {{result.food[0].user.name}} </span></div>
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
         
         <img v-if="result.food[0].images[0]" class="object-cover rounded  w-full " :src="result.food[0].images[0].url" alt="">
         <img v-else class="object-cover rounded  w-full " src="../../public/Screenshot_20220729_194859.png" alt="">
       </div>
       <div class="flex-1 relative flex flex-col p-4 rounded text-lg  border-2 border-gray-400 space-y-3">
        <div class="text-xl font-bold self-center  text-orange-600">Quick facts</div>
       <div>{{result.food[0].duration}} min</div> 
       <div> {{result.food[0].Ingredients_aggregate.aggregate.count}} ingredients</div> 
       <div>  category of {{result.food[0].category}} </div> 
       </div>

    </div>

    <div class="flex md:flex-row border-b-2 border-gray-400  flex-col md:space-y-0 space-y-10">
      <!-- ingredien -->
     
      <div class="grid grid-cols-2 gap-y-4 gap-x-4 p-3 self-start basis-1/2">
        <div class="col-span-2 flex justify-center text-2xl font-bold"><span>Ingredients</span></div>
         <div v-for="ingredien in result.food[0].Ingredients" :key="ingredien" class="flex space-x-3">
         <i class="fa-solid fa-spoon"></i>
         <span>{{ingredien.amount}} {{ingredien.unit}} of {{ingredien.ingredient_name}}</span>
          
         </div>

      </div>

      <!--steps  -->
      <div class="flex flex-col  space-y-8 pb-8">
        <div class="text-2xl font-bold self-center ">Steps</div>
         <div v-for="(steps , index) in result.food[0].steps" :key="index" class="flex flex-col space-y-3">
           <div class="flex space-x-3  ">
             <i class="self-center text-2xl font-bold text-orange-600 fa-regular fa-circle-check"></i> 
             <span class="text-xl font-bold">step {{index+1}}</span>
            </div>
            <div>{{steps.instruction}}</div>
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
             <i class="self-center text-lg font-bold text-orange-600 fa-regular fa-circle-check"></i> 
             <span class="text-xl font-bold">step 1</span>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, omnis.</div>
        </div>
      </div>
    </div>

    <div class=" p-4 flex border-b-2 border-gray-400 pb-11  flex-col space-y-6 space-x-10 ">
      <div class="text-2xl text-black font-bold">Reviews</div>
      <div class="flex ">
      <div class="text-md basis-1/2 text-black font-bold"> <span>What did you think of this
         recipe? Share your experience to help others</span></div>
      <div class="basis-1/2"> <button class="p-4 bg-orange-600 text-white rounded">Add your rating and review </button></div>
      </div>
      <div>

      </div>

    </div>

    <div>
       <div class="flex flex-col space-y-4 border-b-2 border-gray-400/25 pb-11 ">
         <div class="flex space-x-4">
           <i class="text-4xl fa-solid fa-circle-user"></i>
           <span>samuel</span>
         </div>
         <div class="flex space-x-3">
           <div class="text-orange-600">
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
           </div>
           <div>12/34/2021</div>
         </div>
     <div>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt architecto odio numquam doloremque doloribus?
     </div>
       </div>
        <div class="flex flex-col space-y-4 border-b-2 border-gray-400/25 pb-11 ">
         <div class="flex space-x-4">
           <i class="text-4xl fa-solid fa-circle-user"></i>
           <span>samuel</span>
         </div>
         <div class="flex space-x-3">
           <div class="text-orange-600">
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
           </div>
           <div>12/34/2021</div>
         </div>
     <div>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt architecto odio numquam doloremque doloribus?
     </div>
       </div> <div class="flex flex-col space-y-4 border-b-2 border-gray-400/25 pb-11 ">
         <div class="flex space-x-4">
           <i class="text-4xl fa-solid fa-circle-user"></i>
           <span>samuel</span>
         </div>
         <div class="flex space-x-3">
           <div class="text-orange-600">
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
           </div>
           <div>12/34/2021</div>
         </div>
     <div>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt architecto odio numquam doloremque doloribus?
     </div>
       </div> <div class="flex flex-col space-y-4 border-b-2 border-gray-400/25 pb-11 ">
         <div class="flex space-x-4">
           <i class="text-4xl fa-solid fa-circle-user"></i>
           <span>samuel</span>
         </div>
         <div class="flex space-x-3">
           <div class="text-orange-600">
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
           </div>
           <div>12/34/2021</div>
         </div>
     <div>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt architecto odio numquam doloremque doloribus?
     </div>
       </div>

    </div>

  </div>
</div>
<Footer></Footer>

</template>
<style scoped>
.profile{
   width:1000px;
}
</style>