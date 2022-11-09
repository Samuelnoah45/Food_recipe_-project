<script setup>
import {  ref} from "vue";
import NavBar from "../components/NavBar.vue";
import Card from "../components/card.vue";
import Footer from '../components/Footer.vue'
import { useQuery, useMutation} from "@vue/apollo-composable";
import allfoods from "../graphql/query/foods.gql";
import {  useUserStore} from '../store/userInfo'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useRoute } from "vue-router"; 
import bcrypt from 'bcryptjs';
const userStore = useUserStore();
const route=useRoute()
const router = useRouter();
const searchQuery=ref('')
 var password =  bcrypt.hashSync("12121212", 12);

 console.log(password=="$2b$12$FWwf/txh6HTMdtP7bCcKGurpSHbn7CPHOEoKNWjGjz8in4VGDc9Lu");

let varibales = ref({
    id: 10
})
var option={
    fetchPolicy: "network-only" 
}
console.log(userStore.user);
const {result,onResult,loading,onError,variables,fetchMore} = useQuery(allfoods, () => ({
    offset: userStore.user.pageNumber * 12 - 12,
    limit: 12
}
)
 );

let total = ref();
onResult(({
    data
}) => {
   
    // total = result.value.food_aggregate.aggregate.count;
    const itemPerPage = 5;

});
onError((err) => {
    console.log(err);
});

const onClickHandler = (page) => {
    userStore.setPage(page);
    fetchMore({
        variables: {
            offset: userStore.user.pageNumber * 12 - 12,
        },
        updateQuery: (previousResult, {
            fetchMoreResult
        }) => {
            if (!fetchMoreResult) return previousResult
            return {

                food: [
                    ...fetchMoreResult.food,
                ],
                food_aggregate: fetchMoreResult.food_aggregate
            }
        },

    })

     window.scrollTo(0,0);

};

onBeforeRouteLeave((to, from) => {
    userStore.setPage(1);

})

const searchRecipes = () =>
{
    console.log(searchQuery.value);
   router.push({name:"search" ,query:{search:searchQuery.value}})

    
}

// window.onscroll = () => {
//     let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

//     if (bottomOfWindow) {

//         console.log("fetch it");
//     }
// };
</script>
<template>

    <div>
    <NavBar></NavBar>
    </div>
    <div class="flex h-screen flex-col ">
    <div class="header relative grid basis-8/12  justify-center items-center space-y-16 bg-amber-50 pt-20 ">
        <div class="sreach-box  flex justify-center pt-10">
            <div class="flex flex-col items-center space-y-10">
                  <div class="text-white font-extrabold md:text-5xl self-end text-2xl text-center">“Good food changes the mood.<br> try new recipes with us.”</div>
                  <div class="relative">
                      <input  v-model="searchQuery" type="text" class="p-2 md:w-96 w-52" placeholder="search recipe">
                      <span @click="searchRecipes" class="icon p-2 absolute right-0 text-white text-md bg-orange-700">
                          <i  class="fa-solid fa-magnifying-glass"></i>
                      </span>
                  </div>
            </div>
        </div>
    </div>
  </div>
    <div v-if="loading" class="relative -top-52 min-h-[40rem] flex flex-col ">
        <div class="flex flex-auto flex-col justify-start items-center p-4 md:p-5">
            <div class="flex justify-center">
                <div class="animate-spin text-9xl inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="relative md:-top-64  -top-52 flex flex-col  items-center w-full">
        
             <div class="cook md:text-3xl text-xl mb-10 font-sans font-extrabold text-black">WHAT TO COOK TODAY</div>
        <div class="w-full flex justify-center">
           <div class="homeCard md:grid-cols-3 md:grid   md:col-start-2 md:col-end-6 ">
               <Card  class="m-6 flex-shrink-0" v-for="food in   result.food" :key="food" :food="food" ></Card>
           </div>
           
        </div>
        <div>
            <vue-awesome-paginate class="self-center  m-4 mt-6" :total-items="result.food_aggregate.aggregate.count" :items-per-page="12" :max-pages-shown="7" :current-page="userStore.user.pageNumber" :on-click="onClickHandler" />
        </div>
    </div>
    <Footer></Footer>

</template>
<style>
.homeCard{
    width:1000px

}
.home {
    background-image: url(../assets/images/homepage.jpg);
    background-attachment: fixed;
}

.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;

}

.paginate-buttons:hover {
    background-color: #ae8673;
    color: aliceblue
}

.active-page {
    background-color: #f56117;
    border: 1px solid #f56117;
    color: white;
}

.active-page:hover {
    background-color: #f56117;
}

.header{
background-image: url('../../public/black2.jpeg'), linear-gradient(#e66465, #9198e5);;
background-size: cover;

}
</style>
