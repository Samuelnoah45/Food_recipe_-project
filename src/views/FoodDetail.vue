<script setup>
import Navbar from "../components/NavBar.vue"
import Footer from '../components/Footer.vue'
import RecipeDetail from '../graphql/query/recipeDetail.gql'
import review from '../graphql/mutation/reviewRecipe.gql'
import { useUserStore} from '../store/userInfo'
import { useRoute, useRouter} from 'vue-router';
import { useQuery, useMutation } from "@vue/apollo-composable";
import bookmarkQuery from '../graphql/mutation/bookmark.gql'
import { ref, computed } from 'vue';
import { useBookmarkStore } from "../store/bookmarkInfo"
import useNotify from "../composable/notify";
const bookmarkStore=useBookmarkStore()
const { notify } = useNotify();
const router = useRoute()
const userStore = useUserStore();
const commentSuccess=ref(false)
const commentError=ref(false)
const route=useRouter()
const food_Id = ref({ id: 18 })

//comment object 
const comment = ref({
    comment: "",
    food_id:router.params.id,
    user_id: userStore.user.userId
})

//bookmark object 
const bookmark =ref({
     foodId:router.params.id,
     userId: userStore.user.userId
})

//rating object 
const rating = ref({
    rating:0,
    food_id:router.params.id,
    user_id: userStore.user.userId
})


food_Id.value =router.params.id
//query from recipe detail
const {result,onResult,onError,loading,refetch} = useQuery(RecipeDetail, {
    id: router.params.id
})

//mutation from recipes comment and rating
const { result:reviewResult,mutate: sendReviews ,onDone,loading:reviewLoading,onError:reviewsError} = useMutation(review,() => ({
        variables: {
        comment: comment.value,
        rating: rating.value,
 
    },
}))
//mutation for  bookmark 
const { mutate: bookmarkRecipe, loading: bookmarkLoading, onDone: bookmarkDone } = useMutation(bookmarkQuery, () => ({
    variables: {
        object:bookmark.value
        
    }
}))

onResult(() => {
    const detail = computed(() => result.value?.users??[])
})
  

onError((err) => {
    console.log(err);
});

// success notification for comment and  rating
onDone(() =>
{
    comment.value.comment = "";
    rating.value.rating = 0;
    notify({
    title: "commented successfully",
    description:"you have commented successfully",
    cardClass: "bg-blue-100"
});

refetch()
    //  route.go()
    
})
bookmarkDone(() =>
{

   bookmarkStore.push_bookmark(parseInt(router.params.id))
    
})

// console.log(bookmarkStore.bookmarks)
//Error for comment and notification 
reviewsError(() =>
{
    notify({
    title: "Error ",
    description:"you have already commented",
    cardClass: "bg-red-100"
  });
    
})


 function scroll(){
    var top = document.getElementById("reviews").scrollIntoView({behavior: 'smooth'}, true);
  }

</script>

<template>
<Navbar></Navbar>
<div v-if="loading" class="min-h-[45rem] flex flex-col   rounded-xl  ">
        <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div class="flex justify-center">
                <div class="animate-spin text-4xl inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
<div v-if="result" class="flex  justify-center pt-24  mb-8">
    <div v-if="loading" class="min-h-[45rem] flex flex-col   rounded-xl  ">
        <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div class="flex justify-center">
                <div class="animate-spin text-9xl inline-block w-28 h-28 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="profile p-8  flex flex-col space-y-10 ">
        <div class="flex flex-col space-y-10">
            <div v-if="result" class="text-4xl text-black  font-bold">{{result.food[0].title}} </div>
            <div class="flex  space-x-4" :set="(averageRate =result.food[0].ratings_aggregate.aggregate.avg.rating)">
                <div v-if="averageRate" class="text-orange-600">
                    <span v-for="n in 5" :key="n">
                        <i class="fa-solid fa-star" v-if="n <= averageRate"></i>
                        <i class="fa-solid fa-star-half-stroke" v-else-if="n-averageRate < 1 && n- averageRate >0"></i>
                        <i class="fa-regular fa-star" v-else-if="n-averageRate"></i>
                    </span>
                </div>
                <span>
                    {{result.food[0].ratings_aggregate.aggregate.count}} Rating
                </span>
                <span>
                    {{result.food[0].comments_aggregate.aggregate.count}} Reviwes
                </span>
            </div>
            <div>
                {{result.food[0].description}} 
            </div>
            <div class="flex space-x-5"><i class="text-4xl fa-solid fa-circle-user"></i>
                <span class="self-center">Recipe by {{result.food[0].user.name}} </span></div>
        </div>

        <div class="flex md:space-x-10 border-b-2 border-gray-400 pb-11 space-y-10 md:space-y-0 md:flex-row flex-col">
            <div class="basis-1/7 md:block flex sticky">
                <button @click="bookmarkRecipe" :class="{'text-orange-600':bookmarkStore.check_bookmark(food_Id)}" class="  relative items-center flex flex-col cursor-pointer  p-4 hover:text-orange-600">
                    <i  class="fa-solid fa-bookmark"></i>
                  <span v-if="bookmarkStore.check_bookmark( parseInt(router.params.id))">saved</span>
                  <span v-else>save</span>
                 <span v-if="bookmarkLoading" a class=" absolute animate-spin  left-5 text-9xl inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading"></span>
                </button>
                <div  @click="scroll" class="items-center cursor-pointer flex flex-col  p-4 hover:text-orange-600">
                    <i class="fa-regular fa-star"></i>
                    <span>Rate</span>
                </div>
                <!-- <div class="items-center flex flex-col  p-4 hover:text-orange-600">
                    <i class="fa-regular fa-thumbs-up"></i>

                    <span>like</span>
                </div> -->
            </div>

            <div class="basis-3/5 max-w-xl ">

                <img v-if="result.food[0].images[0]" class="object-cover rounded   max-h-96 w-full " :src="result.food[0].images[0].url" alt="">
                <img  v-else class="object-cover h-64 rounded  " src="" alt="">
            </div>
            <div class="flex-1 relative flex flex-col p-4 rounded text-lg  border-2 border-gray-400 space-y-3">
                <div class="text-xl font-bold self-center  text-orange-600">Quick facts</div>
                <div>{{result.food[0].duration}} min</div>
                <div> {{result.food[0].Ingredients_aggregate.aggregate.count}} ingredients</div>
                <div> category of {{result.food[0].category}} </div>
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
            </div>
        </div>
        <div id="reviews"></div>
        <div  class="p-4 flex border-b-2 border-gray-400 pb-11  flex-col space-y-6 space-x-10 ">
            <div class="text-2xl text-black font-bold">Reviews</div>
            <div class="flex  items-center flex-col space-y-10">
                    <div class="text-md  text-black font-bold">
                        <span>What did you think of this recipe?  comment  and rate recipe </span>
                    </div>
                     <div class="w-full flex md:flex-row flex-col space-x-10">
                        <textarea v-model="comment.comment" class="border border-orange-600 p-4 w-60 md:w-100" placeholder="put you comment it will help other " name="" id="" cols="40" rows="5">
                        </textarea>
                        
                    <div class="rating self-center ">
                        <input v-model="rating.rating" type="radio" name="rating" value="5" id="5"><label for="5">☆</label>
                        <input v-model="rating.rating" type="radio" name="rating" value="4" id="4"><label for="4">☆</label>
                        <input v-model="rating.rating" type="radio" name="rating" value="3" id="3"><label for="3">☆</label>
                        <input v-model="rating.rating" type="radio" name="rating" value="2" id="2"><label for="2">☆</label>
                        <input v-model="rating.rating" type="radio" name="rating" value="1" id="1"><label for="1">☆</label>
                       </div>
                    </div> 
                <div class=""> 
                    <button  @click="sendReviews"  class=" relative p-4 hover:bg-orange-500 bg-orange-600 text-white rounded">submit you review
                        <span v-if="reviewLoading" a class=" absolute animate-spin  left-14 text-9xl inline-block w-9 h-9 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    </button>

                   <!-- <div class="absolute w-full h-screen "></div> -->
                    <div v-if="commentSuccess" class="text-green-600">Thanks for your comment</div>
                    <div v-if="commentError" class="text-red-600">sorry you reviewed first </div>
                </div>
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
           
           
           

        </div>

    </div>
</div>
<Footer></Footer>
</template>

<style scoped>
.profile {
    width: 1000px;
}
.rating {
display: flex;
flex-direction: row-reverse;
justify-content: center;
}


.rating > input{ display:none;}

.rating > label {
position: relative;
font-size: 40px;
color: #ff7700;
cursor: pointer;
}

.rating > label::before{
content: "\2605";
position: absolute;
opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before {
opacity: 1 !important;
}

.rating > input:checked ~ label:before{
opacity:1;
}

.rating:hover > input:checked ~ label:before{ opacity: 0.4; }

</style>
