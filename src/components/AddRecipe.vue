<script setup>
import { ref } from 'vue'
import NavBar from "../components/NavBar.vue";
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import insertFoodinfo from '../graphql/mutation/insertFoodDitail.gql';
import {  useMutation} from '@vue/apollo-composable';
import {  useQuery} from '@vue/apollo-composable';
import upload from '../graphql/query/uploadImage.gql'
import AddFood from '../graphql/mutation/insertFood.gql'
import useNotify from "../composable/notify";

import { useUserStore } from '../store/userInfo'
import { useRouter } from 'vue-router';
const { notify } = useNotify();
const router =useRouter()
const userStore = useUserStore();

//object to store  ingredients of foods
const ingredients = ref([{
    amount: 0,
    food_id: null,
    ingredient_name: "",
    unit: ""
}])

const steps = ref([{
    stepNumber: 1,
    instruction: "",
    food_id: null

}])

const food = ref({
    title: "",
    category: "",
    description: "",
    duration: 0,
    user_id: userStore.user.userId
})

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

//insertion for Ingredient
const { mutate: insertAll, loading: loadingInsert ,onDone:insertAllDone} = useMutation(insertFoodinfo, () => ({
    variables: {
        object1: ingredients.value,
        object2: steps.value,
        object3: urls.value,
    },
    
    fetchPolicy: "network-only" 

    
}))

insertAllDone(() =>
{
    notify({
    title: "Created successful",
    description:"you have successfully created the recipes",
    cardClass: "bg-blue-100"
  });
 router.push({ name: 'detail', params: { id:Food_id.value }})
    
})

//insertion for food
const {  mutate: insertFood,  onDone,  loading: LoadingImage} = useMutation(AddFood, () => ({
    variables: {
        object: food.value,
    },
}))

//upload image

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

const addMore = () => {
    if (ingredients.value[ingredients.value.length - 1].ingredient_name != "" &&
        ingredients.value[ingredients.value.length - 1].unit != "" &&
        ingredients.value[ingredients.value.length - 1].amount != 0) {
        ingredients.value.push({
            amount: 0,
            food_id: 23,
            ingredient_name: "",
            unit: ""
        });
        IngError.value = false;
    } else {
        IngError.value = true;
    }
}
const remove = (index) => {
    if (ingredients.value.length > 1) {
        ingredients.value.splice(index, 1);

    }
}

const removeImage = (index) => {
    if (ingredients.value.length > 1) {
        ingredients.value.splice(index, 1);

    }
}

const addMoreStep = () => {
    if (steps.value[steps.value.length - 1].instruction != "") {
        steps.value.push({
            stepNumber: steps.value.length + 1,
            instruction: "",
        });
        console.log(steps.value)
        StepError.value = false;
    } else {
        StepError.value = true
    }
}

const removeStep = (index) => {
    if (steps.value.length > 1) {
        steps.value.splice(index, 1);
    }
}

const submit = () =>
    {
        if (steps.value[steps.value.length - 1].instruction != "") {
            if (ingredients.value[ingredients.value.length - 1].ingredient_name != "" &&
                ingredients.value[ingredients.value.length - 1].unit != "" &&
                ingredients.value[ingredients.value.length - 1].amount != 0) {
                IngError.value = false;
                
                insertFood();
                onDone(result => {
                    Food_id.value = result.data.insert_food_one.id
                    for (let i = 0; i < steps.value.length; i++) {
                        steps.value[i].food_id = Food_id;
                    }
                    for (let i = 0; i < ingredients.value.length; i++) {
                        ingredients.value[i].food_id = Food_id;
                    }
                    queryOptions.value.enabled = true
                })

                // insertIng();
            } else {
                IngError.value = true;
            }
            StepError.value = false;
        } else {
            StepError.value = true
        }
        console.log(ingredients.value);
    }

const mainImage = (index) => {
    const temp = variables.value.image[index];
    variables.value.image[index] = variables.value.image[0]
    variables.value.image[0] = temp;
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
const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    duration: Yup.number("duration must be number").min(1,"duration must be greater than 1")
   
});
</script>
<template>
<Form  @submit="submit" :validation-schema="schema" v-slot="{errors}">

<div class="p-8">
    <div class="text-2xl p-4 text-black font-mono font-bold"><span><i class="text-orange-600 font-bold fa-solid fa-plus"></i></span>Add Recipe</div>
    <div class="text-sm m-4">Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the sky community.</div>
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
                                <Field  @change="handleImage" class="opacity-0 w-60 " ref="file" type="file" accept="image/*" multiple name="image" id=""/>
                                <span class="text-red-600">{{errors.image}}</span>
                            </label>
                        </div>
                       
              
               
            </div>
            <div v-if="variables.image.length>0" class="">
                <div class="grid grid-cols-3 ">
                    <div class=" m-2 max-w-full" v-for="(path ,index) in variables.image" :key="index">
                        <label @click="mainImage(index)" :for="index">
                            <img :src="path" class="pt-1  text-sm h-60 w-60 text-gray-400 max-w-full object-cover group-hover:text-gray-600" />
                        </label>
                        <div class="flex justify-between pt-2 px-2">
                            <div v-if="index==0" class="text-md font-bold rounded p-2  text-green-600">cover</div>
                            <div v-else class="text-md font rounded p-2  text-orange-600">sub</div>
                            <span @click="variables.image.splice(index,1)" class="text-red-600 "><i class="fa-solid fa-trash-can"></i></span>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="text-xl font-extrabold">
                        <span class="bg-gray-300 rounded p-2"><i class="text-orange-600 font-bold fa-solid fa-plus"></i> Add
                        </span>
                        <input @change="handleImage" class="opacity-0" ref="file" type="file" accept="image/*" multiple name="" id="">
                    </label>
                    <span class="font-bold">Click image  to make it main</span>
                </div>
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
        <div class="" v-for="(ingredient, index) in ingredients" :key="index">
            <div class="flex justify-evenly   md:ml-2 ml-0 mt-4">
                <input v-model="ingredient.ingredient_name" type="text" placeholder="Ingrident Name" class=" m-2 flex md:w-auto w-24 p-2 border border-gray-500 rounded" />
                <input v-model="ingredient.amount" type="number" placeholder="Ingrident Amount " class="md:w-auto  w-10 m-2 p-2 border border-gray-500 rounded" />
                <input type="text" v-model="ingredient.unit" placeholder="Ingrident Unit" class="md:w-auto w-24 m-2  p-2 border border-gray-500 rounded" list="units" />
                <datalist id="units">
                    <option>sini</option>
                    <option>cup</option>
                    <option>tablespoon</option>
                    <option>litter</option>
                    <option>gram</option>
                </datalist>
                <button type="button" class=" rounded-full  text-red-700 font-mono font-bold text-2xl" @click="remove(index)">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

        </div>
        <div v-if="IngError" class="text-red-600 flex justify-center">
            Fill value
        </div>
        <div class="flex justify-center p-8">
            <button type="button" class="flex justify-start ml-2 rounded-md border px-3  py-2 bg-orange-600 text-white" @click="addMore()">
                Add More
            </button>
        </div>
    </div>
</div>

<div class="md:p-8 p-2">
    <div class=" md:mt-2 mt-1 p-6 border-y-2 border-gray-400 ">
        <div class="text-2xl font-bold">Steps </div>
        <div>
            Enter step for recipe
            Enter one step per line. Include short instrunction
        </div>

        <div class="mt-6" v-for="(step, index) in steps" :key="index">
            # step {{index+1}}
            <div class="flex justify-evenly ml-1 mt-1 space-x-6">
                <textarea v-model="step.instruction" placeholder="Step instrunction" class=" p-1 border border-gray-500 rounded flex-1 m-1"></textarea>

                <button type="button" class=" rounded-full  text-red-700 font-mono font-bold text-3xl" @click="removeStep(index)">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        <div v-if="StepError" class="text-red-600 flex justify-center">
            Fill all values
        </div>
        <div class="flex justify-center p-8">
            <button type="button" class="flex justify-start ml-2 rounded-md border px-3  py-2 bg-orange-600 text-white" @click="addMoreStep()">
                Add More
            </button>

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

</template>

<style scoped>

</style>
