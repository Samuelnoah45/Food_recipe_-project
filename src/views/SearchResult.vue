<script setup>

//components 
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue'
import card from '../components/card.vue'

import { useQuery } from '@vue/apollo-composable';
import {useRoute, onBeforeRouteUpdate} from 'vue-router'
import { ref, computed ,toRef} from 'vue';
import filter from '../graphql/query/filterFood.gql'
import router from '../router';
import search from '../graphql/query/searchFood.gql'
const filterFlag=ref(false)
const route = useRoute();
const searchTerm = ref("")
const searchTime=ref(true)
const filterTime=ref(false)
const includeInput = ref("");
const category=ref("")
// const notIncludeInput = ref("");
const include = ref([])
// const notInclude = ref([])
const filterOption = ref({
    enabled: false
})
const searchOption = ref({
    enabled: false
})
let findOption = ref();

//filter  for recipes 
const filterQuery = computed(() =>
{    
    let filterTerm = [{
           _and:[]
    }]


    if (include.value.length > 0) {
        filterFlag.value=true
        filterTerm[0]._and.push(  {
            Ingredients: {
                ingredient_name: 
                    { _in: include.value }
            }
        })
    }

    if (category.value) {
        filterFlag.value=true

        filterTerm[0]._and.push( {category: {_eq: category.value}})
    }  
    return {  

        filterTerm
    }
})

//  search term 
const searchQuery = computed(() =>
{
    return {
          filterTerm :[
                {
                  title: {_like:`%${searchTerm.value}%` }
                },
                {
                  user: {name:{_like: `%${searchTerm.value}%`}}
                }
                 
                ]

            }    
})


const pushToInclude = () =>
{
    include.value.push(includeInput.value)
    includeInput.value=""

}

const removeInc = (index) =>
{
    include.value.splice(index,1)
}



const { result, onResult:onFilter, onError } = useQuery(filter, filterQuery, filterOption) 
const { result:searchResult,onResult:onSearch } = useQuery(filter, searchQuery,searchOption) 
   


const findRecipe = (findBy) =>
{   
    if (findBy == "filter") {
        searchTime.value = false
        filterTime.value=true
        // searchOption.value.enabled = false
        filterOption.value.enabled=true

          
    }

    else {
         searchTime.value = true
        filterTime.value=false
        searchOption.value.enabled = true
        // filterOption.value.enabled=false
          
      }  
}



onFilter((result) =>
{
    filterOption.value = false
 console.log(result)
    
})
onSearch((searchResult) =>
{
 console.log(searchResult)
 searchOption.value=false
    
})



const searchRecipe= () =>
{
   router.replace({name:"search" ,query:{search:searchQuery.value}})
}

const recipes1 = computed(() => result.value?.food ?? [])
const recipes2 = computed(() => searchResult.value?.food ?? [])



</script>

<template>
<NavBar></NavBar>
<div class="headerSpace relative justify-center md:justify-evenly items-center space-y-16 bg-amber-50 pt-36">
    <!-- <img src="../assets/Foods/food5.jpg" alt=""> -->
    <div class=" min-w-full flex justify-center">

        <div class="  p-6 bg-white border-l-8 border-orange-600 rounded-l ">
            <div class="text-xl flex  font-mono ">
                  <input v-model="searchTerm" class="border-2  p-1 border-black" type="text">
            <button @click="findRecipe('search')" class="bg-orange-600 p-2"><i class="text-white fa-solid fa-magnifying-glass"></i></button>

            </div>
        </div>

    </div>

</div>

<div class="flex  justify-center ">
    <div class="profile   md:flex-row   flex flex-col ">
        <div class="md:mr-8 m-0  basis-1/4  flex-shrink-0 md:sticky top-24 bg-white shadow-lg  md:self-start  pb-2">
            <div class=" flex  justify-between p-4 border-b-2  border-black">
                <div class="flex  justify-between items-center">
                    <span class="text-xl font-sans font-bold text-black">Filters</span>
                </div>

                <div class="flex  justify-center items-center">
                    <button class="text-md px-1  py-1  bg-white border-2 rounded border-orange-600 font-sans  text-black"> clear All</button>
                </div>

            </div>

            <div class=" p-4 flex flex-col space-y-4 border-black border-b-2 ">
                <div class="text-md font-sans flex justify-between font-bold text-black">
                    <span>Recipe Title</span>
               <!-- <button><i class="text-xl font-bold text-orange-600 fa-solid fa-angle-up"></i></button> -->
                </div>

                <div class="grow ">
                    <div class="flex">
                        <div class="mb-3 w-full">
                            <span>select category</span>
                            <select v-model="category" placeholder="select category" 
                                class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal 
                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid
                                border-gray-300 rounded  transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 
                                focus:outline-none" aria-label="Default select example">
                                <option value="dinner">dinner</option>
                                <option value="lunch">lunch</option>
                                <option value="breakfast">breakfast</option>
                            </select>
                            </div>            
                    </div>
                </div>
            </div>
            <div class=" p-4 flex flex-col space-y-4 border-black border-b-2 ">
                <div class="text-md font-sans flex justify-between font-bold text-black">
                    <span>Include these Ingredients</span>
                    <!-- <button><i class="text-xl font-bold text-orange-600 fa-solid fa-angle-up"></i></button> -->
                </div>

                <div class="grow relative flex">
                    <input class="border-2 w-full p-2 border-black rounded" type="text" v-model="includeInput">
                    <span @click="pushToInclude" a class="absolute top-1 cursor-pointer right-3 flex text-xl justify-center items-center font-bold  w-8 h-8 border-4 border-black/80 text-black rounded-full">+
                    </span>
                </div>
                <div  class="flex flex-wrap">
                 <span v-for="(Inc ,index) in include" :key="index"   class="p-2 rounded-lg m-1 text-white bg-gray-400">{{Inc}}
                  <span @click="removeInc(index)" class="text-lg font-bold text-red-700 cursor-pointer">x</span></span>
                
                </div>

            </div>
          
            <div class="flex justify-center my-4 ">
                <button @click="findRecipe('filter')" class="p-2  rounded-lg bg-orange-600 text-white">Filter Recipe</button>
            </div>
        </div>

        <div   class="grow min-w-ful p-8 scrollbar-hide  overflow-scroll ">
            <!-- <div class="text-xl text-black font-bold ">{{recipes}} result found</div> -->
            <div v-if="searchTime" class="flex md:flex-row  flex-col justify-evenly  flex-wrap   border-b-2">
                <card class="basis-1/4 mx-1 m-8" v-for="recipe in recipes2" :key="recipe" :food="recipe"></card>
            </div>

            <div v-if="filterTime" class="flex md:flex-row  flex-col justify-evenly  flex-wrap   border-b-2">
                <card class="basis-1/4 mx-1 m-8" v-for="recipe in recipes1" :key="recipe" :food="recipe"></card>
            </div>
        
        </div>

         
        
    </div>
</div>
<Footer></Footer>
</template>

<style>
.sky {
    overflow-wrap: anywhere;
}

.profile {
    width: 1600px;
}

label {
    font-size: large;
    font-weight: 600;
}

.headerSpace {
    background-image: url('../../public/black2.jpeg');
    background-size: cover;
    background-position: center;
}
</style>
