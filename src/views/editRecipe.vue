<script setup>
import { ref ,isReactive,isReadonly,watchEffect,triggerRef,shallowRef} from 'vue'
import NavBar from "../components/NavBar.vue";
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import foodDetail from '../graphql/query/recipeDetail.gql';
import updateFoodDetail from '../graphql/mutation/updateRecipeDetail.gql';
import {  useMutation} from '@vue/apollo-composable';
import {  useQuery} from '@vue/apollo-composable';
import upload from '../graphql/query/uploadImage.gql'
import AddFood from '../graphql/mutation/insertFood.gql'
import { useUserStore } from '../store/userInfo'
import Navbar from "../components/NavBar.vue"
import { useRouter ,useRoute} from 'vue-router';

const router =useRouter()
const route =useRoute()
const userStore = useUserStore();
const shallow = ref({
    ingredients:[]
})


var ingredients = ref([])
var ingredients2 = ref()

const steps = ref([])
const steps2 = ref([])

const food = ref({})

const Food_id = ref()
// const images = ref([])
const variables = ref({
    image: [],
});
const urls = ref([])
const IngError = ref(false)
const StepError = ref(false)
const queryOptions = ref({
    enabled: false,
    fetchPolicy: "network-only" 

})

console.log();
//insertion for Ingredient
const { mutate: insertAll, loading: loadingInsert ,onDone:insertAllDone} = useMutation(
    updateFoodDetail, () => ({
    variables: {
        stepObj:steps.value,
        ingObj:ingredients.value,
        update:food.value,
        id:route.params.id
    
    },
    
})


)
insertAllDone(() =>
{
   refetch();

//  router.push({ name: 'detail', params: { id:Food_id.value }})
    
})

const detailOptions = ref({
  fetchPolicy: 'network-only',
})
const {result:detailResult,onResult:onDetailResult,onError:detailError,loading,refetch} = useQuery(foodDetail, {
    id:route.params.id
},
detailOptions
)


onDetailResult((result)=>{
    console.log("aslan");
    food.value.title=result.data.food[0].title,
    food.value.category=result.data.food[0].category,
    food.value.description=result.data.food[0].description,
    food.value.duration=result.data.food[0].duration,
    variables.value.image=result.data.food[0].images
    ingredients2.value=result.data.food[0].Ingredients
    steps2.value=result.data.food[0].steps
  
    const  ingObj={ where: {Ingredient_id: {_eq: 1}}, _set:{ingredient_name:""}}
    const  ingObj2={ where: {id: {_eq: 1}}, _set:{ instruction:"" ,stepNumber:""}}

    for(var i=0;i<result.data.food[0].Ingredients.length;i++){
    ingObj.where.Ingredient_id._eq=result.data.food[0].Ingredients[i].Ingredient_id
    ingObj._set.ingredient_name=result.data.food[0].Ingredients[i].ingredient_name
    ingObj._set.amount=result.data.food[0].Ingredients[i].amount
    ingObj._set.unit=result.data.food[0].Ingredients[i].unit
    ingredients.value.push(ingObj)

    }
    for(var i=0;i< result.data.food[0].steps.length;i++ ){
    ingObj2.where.id._eq=result.data.food[0].steps[i].id
    ingObj2._set.stepNumber=result.data.food[0].steps[i].stepNumber
    ingObj2._set.instruction=result.data.food[0].steps[i].instruction
    steps.value.push(ingObj2)

    }
    console.log(steps.value);
    
})


const changeName=function(index, value){
ingredients.value[index]._set.ingredient_name=value
console.log(ingredients.value);
}

const changeUnit=function(index,value){
  ingredients.value[index]._set.unit=value
  console.log(ingredients.value);

}
const changeAmount=function(index,value){
    ingredients.value[index]._set.amount=value
    console.log(ingredients.value);

}

const chnageInst=function(index,value){
    steps.value[index]._set.instruction=value
    console.log(steps.value);

}
const chnageStepN=function(index,value){
    steps.value[index]._set.stepNumber=value
    console.log(steps.value);

}




const {result,onResult,onError,loading: loadingUpload} = useQuery(upload, variables, queryOptions);
const passit = onResult((result) => {
 if (!result.loading) {
        console.log(result.data.uploadImage.urls.length)
        for (let i = 0; i < result.data.uploadImage.urls.length; i++)
            urls.value.push({
                food_id: Food_id.value,
                url: result.data.uploadImage.urls[i]
            })
        //Inset 3 tables data at one query // console.log(urls)// console.log(food)// console.log(ingredients)// console.log(steps)
        insertAll();

    }

})



const submit = () =>
    {
        console.log(steps.value);
        console.log(ingredients.value);
        console.log(food.value);
        console.log(food.value);
        console.log(food.value);

        insertAll();
    }



//image  to based64 
const handleImage = async () => {
    const files = document.querySelector('input[type=file]').files;
    let images = []
    async function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
                variables.value.image.push(e.target.result);
            }, false);
            reader.readAsDataURL(file); }}
    if (files) {
        for (var i = 0; i < files.length; i++) {
            await readAndPreview(files[i])
        }
    }
}

const post = () => {
    queryOptions.value.enabled = true
}
const ingName=function(index,value){
  console.log(index,value);
  ingredients.value[index].ingredient_name=value
 console.log( ingredients.value[index].ingredient_name);


}
const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    duration: Yup.number("duration must be number").min(1,"duration must be greater than 1")
   
});
</script>
<template>
    <Navbar></Navbar>
    <div class="w-full flex justify-center items-center pt-24  mb-8">
    <div>
        
<Form  @submit="submit" :validation-schema="schema" v-slot="{errors}">

<div class="p-8">
    <div class="text-2xl p-4 text-black font-mono font-bold"><span><i class="text-orange-600 font-bold fa-solid fa-plus"></i></span>Edit Recipe</div>
    <div class="text-sm m-4">Editing personal recipes is easy! Edit yours to your favorites, share with friends, family, or the sky community.</div>
    <div class="border-y-2 border-gray-400 p-4  md:flex-row flex-col flex md:space-x-6 space-x-0">
        <div class="flex-1 space-y-10">
            <div class="flex flex-col">
                <label for="name">Recipe Title *</label>
                <Field name="title" :class="{ 'border-red-600': errors.title }"  class="border-2 p-2 border-gray-300" type="text" v-model="food.title"/>
                <span class="text-red-600">{{errors.title}}</span>
            </div>

            <div class="flex flex-col">
                <label for="name">short description</label>
                <textarea class="border-2 border-gray-300" type="text" v-model="food.description">
                        </textarea>
            </div>
        </div>

        <div class="flex-1 space-y-10">
            <div class="flex flex-col">
                <label for="name">Duration in min *</label>
                <Field name="duration" :class="{ 'border-red-600': errors.duration }"  class="border-2 p-2 border-gray-300" type="number" v-model="food.duration"/>
                <span>{{errors.duration}}</span>
            </div>
            <div class="flex flex-col">
                <label for="name">Category *</label>
                <input name="category"  class="border-2 p-2 border-gray-300" type="text" v-model="food.category" list="category"/>
                <datalist id="category">
                    <option>lunch</option>
                    <option>BreakFast</option>
                    <option>dinner</option>
                    <option>snack</option>
                    <option>dessert</option>
                </datalist>

            </div>

        </div>
    </div>

    <div class="border-y-2 border-gray-400 p-4 flex">
        <div class="min-w-full">
            <div v-if="variables.image.length==0" class="flex justify-center mt-5 w-full">
                    <div class="flex basis-1/4 items-center justify-center flex-col space-y-8 w-full">
                                <div class="font-bold">Select multi images of the recipe</div>
                            <label class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300" :class="{'boreder-red-600':errors.image}">
                                <div class="flex flex-col items-center justify-center pt-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                    </svg>
                                    <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        Select a images </p>
                                </div>
                                <Field  @change="handleImage" class="opacity-0" ref="file" type="file" accept="image/*" multiple name="image" id=""/>
                                <span class="text-red-600">{{errors.image}}</span>
                            </label>
                        </div>
                       
              
               
            </div>
            <div v-if="variables.image.length>0" class="">
                <div class="flex justify-center items-center ">
                
                    <div class=" m-2 max-w-full" v-for="(path ,index) in variables.image" :key="index">
                        <label @click="mainImage(index)" :for="index">
                            <img :src="path.url"  class="pt-1  text-sm h-60 w-60 text-gray-400 max-w-full object-cover group-hover:text-gray-600" />
                        </label>
                        <div class="flex justify-between pt-2 px-2">
                            <div @click="null" class="text-md font-bold rounded p-2 flex justify-center items-center  text-green-600">change cover</div>
                        </div>
                    </div>
                </div>
                <!-- <div>
                    <label class="text-xl font-extrabold">
                        <span class="bg-gray-300 rounded p-2"><i class="text-orange-600 font-bold fa-solid fa-plus"></i> Add
                        </span>
                        <input @change="handleImage" class="opacity-0" ref="file" type="file" accept="image/*" multiple name="" id="">
                    </label>
                    <span class="font-bold">Click image  to make it main</span>
                </div> -->
            </div>
        </div>
    </div>

</div>

<div class="p-8">
    <div class=" mt-2 p-6 border-y-2 border-gray-400 ">
        <div class="text-2xl font-bold">Ingredients </div>
        <div>
            Enter ingredient for recipe
            Enter one ingredient per line. Include the quantity and unit
        </div>
        <div class="flex justify-around ml-2 mt-4 uppercase">
            <div class="">name</div>
            <div>Amount</div>
            <div>Unit</div>
        </div>
        <div class="" v-for="(ingredient, index) in ingredients2" :key="index">
            <div class="flex justify-evenly   ml-2 mt-4">
                <input @input="changeName(index, $event.target.value)" :value="ingredient.ingredient_name" type="text" placeholder="Ingrident Name" class=" m-2 flex md:w-auto w-24 p-2 border border-gray-500 rounded" />
                <input @input="changeAmount(index, $event.target.value)"  :value="ingredient.amount" type="number" placeholder="Ingrident Amount " class="md:w-auto w-24 m-2 p-2 border border-gray-500 rounded" />
                <input @input="changeUnit(index, $event.target.value)"  type="text" :value="ingredient.unit" placeholder="Ingrident Unit" class="md:w-auto w-24 m-2  p-2 border border-gray-500 rounded" list="units" />
                <datalist id="units">
                    <option>sini</option>
                    <option>cup</option>
                    <option>tablespoon</option>
                    <option>litter</option>
                    <option>gram</option>
                </datalist>
              
            </div>

        </div>
        <div v-if="IngError" class="text-red-600 flex justify-center">
            Fill value
        </div>
     
    </div>
</div>

<div class="p-8">
    <div class=" mt-2 p-6 border-y-2 border-gray-400 ">
        <div class="text-2xl font-bold">Steps </div>
        <div>
            Enter step for recipe
            Enter one step per line. Include short instrunction
        </div>

        <div class="mt-8" v-for="(step, index) in steps2" :key="index">
            # step number <input @input="chnageStepN(index, $event.target.value)" type="number" :value="step.stepNumber" class="w-16 h-6 p-2">
            <div class="flex justify-evenly ml-1 mt-1 space-x-6">
               <textarea @input="chnageInst(index,$event.target.value)" :value="step.instruction" placeholder="Step instrunction" class=" p-1 border border-gray-500 rounded flex-1 m-1"></textarea>

              
            </div>
        </div>
        <div v-if="StepError" class="text-red-600 flex justify-center">
            Fill all values
        </div>

    </div>
</div>

<div class="p-8">
    <div class=" mt-2 p-2  ">
        <div class="flex justify-end">
            <button :class="{ 'border-orange-400':loadingUpload}"  type="submit" class="flex justify-start ml-2 rounded-md border px-3  py-2 bg-orange-600 text-white">
                Submit
                 <span v-if="loadingUpload||loadingInsert"  class="absolute  animate-spin inline-block w-7 h-7 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span></span>
            </button>
            <span class="text-red-600" v-if="errors"></span>
        </div>

    </div>
</div>

</Form>
    </div>
</div>

</template>

<style scoped>

</style>
