<script setup>
import NavBar from "../components/NavBar.vue";
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { ref, watch} from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave} from 'vue-router'

import { useQuery} from "@vue/apollo-composable"
import login from '../graphql/auth/login.gql'
import bookmark from '../graphql/mutation/bookmark.gql'
import {  useUserStore} from '../store/userInfo'
const router = useRouter();
const userStore = useUserStore();



const schema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
}

const show = ref(false);
const variables = ref({emails: "",password: ""});

const password = ref();
const queryOptions = ref({enabled: false,fetchPolicy: "network-only" })
    fetchPolicy: "network-only" 
const { result, onResult, onError, loading} = useQuery(login, variables, queryOptions);

// function busi() {
//     checkAccount();

// }

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function checkAccount() {
    queryOptions.value.enabled = true
    const passit = onResult((result) => {
        console.log(result.loading)
        console.log(result)

        if (!result.loading) {

            if (result.data.signin.email != '') {
                const data = result.data.signin
                setCookie("foodRecipeUser", data.token, 30);
                //set user to pinian 

                userStore.setUser(data);
                router.push({
                    path: "/"
                });
                show.value = false;

            } else {
                show.value = true;
                queryOptions.value.enabled = false

            }
        }

    })

}

//  onBeforeRouteLeave((to, from) => {
//     const answer = window.confirm(
//       'Do you really want to leave? you have unsaved changes!'
//     )
//     // cancel the navigation and stay on the same page
//     if (!answer) return false
//   })
</script>

<template>
<div class="login">
    <nav-bar></nav-bar>
    <div class="auth bg-no-repeat bg-cover bg-center relative pt-4" style="">
     <div class="back absolute bg-gradient-to-l from-orange-600 to-orange-400 opacity-75 inset-0 z-1"></div>
        <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
            <div class="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
                <div class="self-start hidden lg:flex flex-col text-white">
                    <img src="" class="mb-3" />
                    <h1 class="mb-3 font-bold text-5xl">Hi 👋 Welcome</h1>
                    <p class="pr-3"></p>
                </div>
            </div>
            <div class="flex justify-center self-center  z-10">
                <div class="p-12 bg-white mx-auto rounded-3xl w-100">
                    <div class="mb-4">
                        <h3 class="font-semibold text-2xl text-gray-800">Sign In</h3>
                        <p class="text-gray-500">Please sign in to your account.</p>
                    </div>
                    <div class="space-y-5">
                        <Form class="space-y-5" @submit="checkAccount" :validation-schema="schema" v-slot="{ errors }">
                        <div class="space-y-2 flex flex-col">
                            <label class="text-sm font-medium text-gray-700 tracking-wide">Email *</label>
                             <Field name="email"  v-model="variables.emails" type="email" class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 "  placeholder="Your email" :class="{ 'border-red-600': errors.email }" />
                             <span class="text-red-600 text-sm" >{{errors.email}}</span>
                       </div>
                        <div class="space-y-2 flex flex-col">
                            <label class=" text-sm font-medium text-gray-700 tracking-wide">
                                Password *
                            </label>
                             <Field name="password"  v-model="variables.password" type="password" class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 "  placeholder="Your email" :class="{ 'border-red-600': errors.password }" />
                             <span class="text-red-600 text-sm" >{{errors.password}}</span>
                        </div>
                       
                        <div class="" v-show="show">
                            <p class="text-red-700">Invalid Email or Password</p>
                        </div>
                        <div class="flex items-center justify-between space-x-7">
                            <div class="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-blue-5 focus:ring-blue-400 border-gray-300 rounded " />

                                <label for="remember_me" class="ml-2 block text-sm text-gray-800">
                                    Remember me
                                </label>
                            </div>
                            <div class="text-sm">
                                <a href="#" class="text-orange-400 hover:text-orange-600">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div class="flex justify-center">
                        <button  :disabled="loading" type="submit" :class="{'bg-orange-300':loading, 'hover:bg-orange-00':loading,}" class=" w-44 flex justify-center bg-orange-400 hover:bg-orange-500 text-gray-100  p-3  rounded-full  tracking-wide font-semibold shadow-lg  cursor-pointer transition  ease-in duration-400 ">
                            Sign in
                        <span v-if="loading" a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                        </button>
                        <!-- <button  @click="checkAccount" type="submit" class=" w-44 flex justify-center bg-orange-400 hover:bg-orange-500 text-gray-100  p-3  rounded-full  tracking-wide font-semibold shadow-lg  cursor-pointer transition  ease-in duration-400 ">
                            Sign in
                        </button> -->
                        </div>
                    </Form>
                    </div>
                    <div class="mt-4">
                        <p class="hover:text-orange-500 text-orange-400">
                            <router-link to="/signup">Register Now </router-link>
                        </p>
                    </div>
                    <div class="pt-5 text-center text-gray-400 text-xs">
                        <span>
                            Copyright © 2021-2022
                        <a href="" rel="" target="_blank" title="Ajimon" class="text-orange hover:text-orange-500">sky</a></span>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <router-view />
</div>
</template>

<style scoped>
@media (max-width:660px) {
    .back {
        display: none;

    }

}

.auth {
    background-image: url("");

}
</style>
