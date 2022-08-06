<script setup>
import {
    ref,
    computed
} from 'vue';
import {
    useQuery
} from '@vue/apollo-composable';
import {
    useUserStore
} from '../store/userInfo';
import myRecipes from '../graphql/query/myRecipes.gql'
import card from '../components/card.vue'

const userStore = useUserStore();
const user_id = ref(userStore.user.userId)

const {
    result,
    onError
} = useQuery(myRecipes, () => ({

    id: userStore.user.userId

}))
console.log(user_id.value);
console.log(result);

onError((error => {
    console.log(error)

}))
const recipes = computed(() => result.value?.food ?? [])
console.log(recipes)

</script>

<template>
<div class="flex flex-col space-y-6 p-8  mb-8 border-b-2">
    <div class="text-3xl  text-orange-600 font-bold">
        SKYRecipe Personal Recipes
    </div>
    <div class="text-black font-bold">
        Recipes you have created on Allrecipes.
        Other users will see the recipes.
    </div>
</div>
<div class="flex md:flex-row flex-col justify-evenly px-4 flex-wrap  border-b-2">
  <card class="basis-1/4 mx-4 mb-4 " v-for="recipe in recipes" :key="recipe" :hideName="true" :food="recipe"></card>
</div>
</template>

<style>

</style>
