<script setup>
import { ref } from 'vue'
import insertIngredient from '../graphql/mutation/insertIngredient.gql';
import { useMutation } from '@vue/apollo-composable';


const { mutate:insertIng } = useMutation(insertIngredient,() => ({
  variables: {
    object: ingredients.value,
  },
}))

const ingredients = ref([{
       amount: 0,
       food_id:23,
       ingredient_name: "",
       unit: ""
}])

const steps = ref([{
   step: 1,
   instuction:"",
 
}])
const title=ref("")
const description = ref("")
const Duration = ref(0)
const category=ref("")

const IngError=ref(false)
const StepError=ref(false)
const addMore = () =>{
   if (ingredients.value[ingredients.value.length - 1].Name != "" &&
      ingredients.value[ingredients.value.length - 1].unit != "" &&
      ingredients.value[ingredients.value.length - 1].amount != 0) {
      ingredients.value.push({
         amount: 0,
         food_id:23,
         ingredient_name: "",
         unit: ""
      });
      IngError.value = false;}
   else {
      IngError.value = true;
       
     }
       


    }
const remove = (index) =>
{
   if (ingredients.value.length > 1) {
      ingredients.value.splice(index, 1);
        
     }
    }


  const addMoreStep = () =>
 {
   if (steps.value[steps.value.length - 1].instuction!= "") {
      steps.value.push({
         step:steps.value.length+1,
         instuction: "",
      });
      console.log(steps.value)
      StepError.value = false;  
   }
   else {
      StepError.value = true  
   }
  }

const removeStep = (index) =>
{
   if (steps.value.length > 1) {
      steps.value.splice(index, 1);   
     }
    }
  
const submit = () =>

{ 
    insertIng()
   console.log(ingredients.value);
}



</script>
<template>
 <div class="p-8">
             <div class="text-2xl p-4 text-black font-mono font-bold"><span><i class="text-orange-600 font-bold fa-solid fa-plus"></i></span>Add Recipe</div> 
              <div class="text-sm m-4">Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the sky community.</div>
               <form action="">
                  <div class="border-y-2 border-gray-400 p-4 flex">
                  <div class="flex-1 space-y-10">
                   <div class="flex flex-col">
                         <label for="name">Recipe Title</label>
                        <input  class="border-2 p-2 border-gray-300" 
                         type="text" 
                         v-model="title"
                         >
                  </div>
                  <div class="flex">
                     <div class="flex flex-col">
                           <label for="name">Category</label>
                           <input  class="border-2 p-2 border-gray-300" 
                           type="text" 
                          v-model="category"
                          list="category">
                            <datalist id="category">
                        <option>lounch</option>
                        <option>BreakFast</option>
                        <option>diner</option>
                        <option>snack</option>
                     </datalist>
                           </div>
                     <div class="flex flex-col">
                         <label for="name">Duration</label>
                        <input  class="border-2 p-2 border-gray-300" 
                         type="number" 
                         v-model="Duration"
                        >
                     </div> 
                  </div> 
                   
                  
                  <div class="flex flex-col">
                        <label for="name">short description</label>
                        <textarea 
                         class="border-2 border-gray-300" 
                         type="text"
                         v-model="description"
                          >
                        </textarea>
                  </div> 
                  </div>

                  <div class="flex-1 flex justify-center items-center">
                     <button><i class="fa-solid fa-camera text-9xl"></i></button>  
                  </div>
             </div>
               </form>
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
               <div class="flex justify-evenly ml-2 mt-4">
                  <input
                     v-model="ingredient.ingredient_name"
                     type="text"
                     placeholder="Ingrident Name"
                     class=" p-2 border border-gray-500 rounded"
                  />
                  <input
                     v-model="ingredient.amount"
                     type="number"
                     placeholder="Ingrident Amount "
                     class=" p-2 border border-gray-500 rounded"
                  />
                  <input type="text" v-model="ingredient.unit" placeholder="Ingrident Unit" class=" p-2 border border-gray-500 rounded" list="units"  />
                     <datalist id="units">
                        <option>x</option>
                        <option>cup</option>
                        <option>tablespoon</option>
                        <option>litter</option>
                        <option>gram</option>
                     </datalist>
                  <button
                     type="button"
                     class=" rounded-full  text-red-700 font-mono font-bold text-4xl"
                     @click="remove(index)"
                     >
                     <i class="fa-solid fa-xmark"></i> 
                  </button>
               </div>
               
               </div>
            <div v-if="IngError" class="text-red-600 flex justify-center">
               Fill  value
               </div>
               <div class="flex justify-center p-8">
                  <button
               type="button"
               class="flex justify-start ml-2 rounded-md border px-3  py-2 bg-orange-600 text-white"
               @click="addMore()"
               >
               Add More
               </button>
               </div>
            </div>
         </div>
  
   <div class="p-8">
      <div class=" mt-2 p-6 border-y-2 border-gray-400 ">
        <div class="text-2xl font-bold">Steps </div>
               <div>
                  Enter step  for recipe
                  Enter one step per line. Include short instrunction
               </div>

      <div class="mt-8" v-for="(step, index) in steps" :key="index">
          # step {{index+1}}
         <div class="flex justify-evenly ml-1 mt-1">
            <textarea
               v-model="step.instuction"
               placeholder="Step instrunction"
               class=" p-1 border border-gray-500 rounded flex-1 m-1"
               ></textarea>
               
            <button
            type="button"
            class=" rounded-full  text-red-700 font-mono font-bold text-4xl"
            @click="removeStep(index)">
            <i class="fa-solid fa-xmark"></i> 
            </button>
         </div> 
      </div>
               <div v-if="StepError" class="text-red-600 flex justify-center">
               Fill all  values 
               </div>
       <div class="flex justify-center p-8">
         <button
            type="button"
            class="flex justify-start ml-2 rounded-md border px-3  py-2 bg-orange-600 text-white"
            @click="addMoreStep()">
            Add More
         </button>
      </div>
   </div>
   </div>
     <div class="p-8">
      <div class=" mt-2 p-2  ">
      <div class="flex justify-end">
         <p class="self-end">cancle</p>
          <button
            type="button"
            class="flex justify-start ml-2 rounded-md border px-3  py-2 bg-orange-700 text-white"
            @click="submit()">
            Submite
         </button>
      </div>
      </div>
      </div>
</template>


<style>

</style>