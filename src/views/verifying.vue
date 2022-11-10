<script setup>
import {  useUserStore} from '../store/userInfo'
import { useQuery, useMutation} from "@vue/apollo-composable";
import verifying from "../graphql/query/verifying.gql"
import cookieHandler from '../../Authentication/cookie'

import { useRoute,useRouter } from 'vue-router';
import {ref} from 'vue'
const route=useRoute();
const router=useRouter()
const userStore = useUserStore();
const token= ref(route.query.token);
const {result,onResult,loading,onError,variables,fetchMore} = useQuery(verifying, () => ({
    token:token.value
}
)
 );

 onResult((data)=>{
const user=data.data.verification;
userStore.setUser(user);
cookieHandler.setCookie("foodRecipeUser",user.token,30);

router.push({ path: "/" });





 })

</script>

<template>
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
	<h1 class="text-3xl font-extrabold text-white tracking-widest">Verifying Email </h1>
	<div class="mt-20">
    <span v-if="loading"  class="animate-spin mt-30 text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-[#FF6A3D] rounded-full" role="status" aria-label="loading">
    </span>
	</div>
	
</main>
</template>

<style scoped></style>