<script setup>
import {
    ref
} from "vue";
import { useRouter } from 'vue-router'

defineProps({
    food: Object,
    hideName: {
        type:Boolean,
        default:false,

    }

    
       })
const x = ref();
const router=useRouter()
const detail = (id) =>
{
router.push({ name: 'detail', params: { id } })
    
}

// const foods = ref(props.foods);
const foodImage = "../image/homepage.jpg";
</script>

<template>
  
        <div @click="detail(food.id)" class="md:block  flex  bg-white rounded-lg  shadow-xl bg-gray-">
            <div class="flex-1 w-full max-h-48 max-w-lg  shrink-0 rounded-t-lg h-64 shadow-2xl overflow-hidden relative">
                <img v-if="food.images.length>0" class="absolute inset-0 min-h-full object-cover"  :src="food.images[0].url" alt="">
                <img v-else class="absolute inset-0 min-h-full object-cover " src="../assets/images/homepage.jpg" alt="" />
                <div class="absolute inset-0  bg-black bg-opacity-30"></div>
                <div class="absolute inset-0 ">
                    <div v-if="!hideName" class="flex justify-center text-2xl hover:text-orange-600 hover:bg- text-white text-right  items-center mt-3 ml-4 h-10 w-10 bg-orange-700  rounded-full">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
                <div class="flex h-full items-center justify-center relative"></div>
            </div>

            <div class="flex-1 p-4">
                <div class="text-xl font-extrabold p-2">
                    <router-link class="hover:underline " :to="{ name: 'detail', params: { id:food.id }}">{{food.title }}</router-link>
                </div>
                <div class=" text-md font-extrabold p-2 flex justify-between">
                    <span class="self-start">
                        {{food.category }}
                    </span>
                    <span class="space-x-2">
                        <i class="fa-solid fa-clock"></i><span>{{food.duration}}min</span>
                    </span>
                </div>
                <div class="text-left text-lg flex flex-col ">
                    <div class="text-left text-sm text-orange-600 my-2 px-2 " :set="(averageRate =food.rating_aggregate.aggregate.avg.rating)">

                        <span class="text-gray-500 pr-2">Rating</span>
                        <div v-if="averageRate">
                            <span v-for="n in 5" :key="n">
                                <i class="fa-solid fa-star" v-if="n <= averageRate"></i>
                                <i class="fa-solid fa-star-half-stroke" v-else-if="n-averageRate < 1 && n- averageRate >0"></i>
                                <i class="fa-regular fa-star" v-else-if="n-averageRate"></i>
                            </span>
                        </div>
                        <div v-else>
                            <span v-for="n in 5" :key="n">
                                <i class="fa-regular fa-star"></i>
                            </span>
                        </div>
                    </div>
                    <div class="self-end mb-2">
                        <p v-if="!hideName" class="text-sm px-2 ">created by <span class="font-serif font-bold">{{food.user.name}}</span></p>
                    </div>

                </div>

            </div>

        </div>
 
</template>

<style>
.bg {
    background: linear-gradient(60deg,
            rgb(142, 252, 233) 10%,
            rgb(88, 161, 230) 50%,
            rgb(185, 147, 243) 100%);
}
</style>
