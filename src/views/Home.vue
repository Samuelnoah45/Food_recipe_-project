<script setup>
import {
    ref
} from "vue";
import NavBar from "../components/NavBar.vue";
import Card from "../components/card.vue";
import Footer from '../components/Footer.vue'
import {
    useQuery,
    useMutation
} from "@vue/apollo-composable";
import allfoods from "../graphql/query/foods.gql";
import {
    useUserStore
} from '../store/userInfo'
import {
    onBeforeRouteLeave,
    useRouter
} from 'vue-router'
const userStore = useUserStore();
const router = useRouter();
let varibales = ref({
    id: 10
})
console.log(userStore.user);
const {
    result,
    onResult,
    loading,
    onError,
    variables,
    fetchMore
} = useQuery(allfoods, () => ({
    offset: userStore.user.pageNumber * 12 - 12,
    limit: 12

    
}));

let total = ref();
onResult(({
    data
}) => {
    console.log(result.value)
    total = result.value.food_aggregate.aggregate.count;
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

    console.log(result)

};

onBeforeRouteLeave((to, from) => {
    userStore.setPage(1);

})

window.onscroll = () => {
    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

    if (bottomOfWindow) {

        console.log("fetch it");
    }
};
</script>
<template>
<div>
    <div>
        <NavBar></NavBar>
    </div>
    <div class="flex h-screen flex-col ">
    <div class="header relative grid basis-8/12  justify-center items-center space-y-16 bg-amber-50 pt-20 pb-20">
        <div class="sreach-box  flex justify-center">
            <div class="">
                <input  type="text" class="p-2 mr-4  " placeholder="search recipe">
                <span class="icon p-2 text-white text-lg bg-orange-700">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>

        </div>
      
      

    </div>
  </div>
    <div v-if="loading" class="relative -top-52 min-h-[40rem] flex flex-col ">
        <div class="flex flex-auto flex-col justify-start items-center p-4 md:p-5">
            <div class="flex justify-center">
                <div class="animate-spin text-9xl inline-block w-28 h-28 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="relative md:-top-64  -top-52 flex flex-col  items-center w-full">
        
             <div class="cook text-3xl mb-10 font-sans font-extrabold text-black">WHAT TO COOK TONIGHT</div>
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
</div>
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
background-image: url('../../public/black2.jpeg');
background-size: cover;

}
</style>
