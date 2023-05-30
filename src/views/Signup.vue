
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMutation, useQuery } from '@vue/apollo-composable'
// import register from '../graphql/auth/signup.gql'
import NavBar from '../components/NavBar.vue'
import { useUserStore } from '../store/userInfo'
import { Form, Field } from 'vee-validate';
import {gql} from "graphql-tag"
import cookieHandler from '../../Authentication/cookie'
import * as Yup from 'yup';
const schema = Yup.object().shape({
  fullName: Yup.string("must be letter").
      matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
      .required('Full name is required'),
  email:Yup.string()
    .required('Username is required')
    .email("email is invalid "),
  password: Yup.string()
    .required('Password is required')
    .min(6, "password must be greater than 6")
    .max(16, "password must be less than 16 letter"),
  confirm: Yup.string().
         oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});



const userStore = useUserStore();
    const router = useRouter();
    const show=ref(false);

const variables=ref({
     email:"",
     password:"", globals: true,
     name:""

})


const queryOptions = ref({ enabled: false ,fetchPolicy: "network-only" })  
const { result, onResult ,loading ,onError} = useQuery(gql`query($email: String!, $password: String!, $name: String!) {
 Signup(email:$email,password:$password,name:$name){
  userId
  name
  email
  token
  image

  
}}`, variables, queryOptions);

const confirmPassword = () =>
{
 queryOptions.value.enabled = true
onResult((result)=>{
  
  if(!result.loading){
       const data=result.data.Signup
       userStore.setUser(data);
      cookieHandler.setCookie("foodRecipeUser",data.token,30);
      show.value=true
    router.push({ path: "/" });
  }
  else{

    queryOptions.value.enabled = false
  }

})
}
onError (()=>{
  queryOptions.value.enabled = false
})




//setcookie function
// function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + (exdays*24*60*60*1000));
//   let expires = "expires="+ d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }


</script>

<template>
  <div class="register">
    <nav-bar></nav-bar>
    <div class=" auth bg-no-repeat bg-cover bg-center relative pt-20">
      <div class="back absolute bg-gradient-to-l from-orange-600 to-orange-400 opacity-75 inset-0 z-0" ></div>
       <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div class="flex justify-center self-center z-10">
          <div class="p-8 bg-white mx-auto w-96 rounded-3xl w-100">
            <div class="mb-4">
              signup
              <h3 class="font-semibold text-2xl text-gray-800">Sign up</h3>
              <p class="text-gray-500">Please fill the from to register.</p>
            </div>
          <Form @submit="confirmPassword" :validation-schema="schema" v-slot="{errors }">
            <div class="space-y-3">
              <div class="space-y-1 flex flex-col">
                <label for="fullName"  class=" text-lg font-medium text-gray-700 tracking-wide"> Full Name </label>
                <Field name="fullName" id="name" v-model="variables.name" :class="{'border-red-600':errors.fullName}" type="text" placeholder="Enter full name" class="px-4 py-2 w-full text-base border border-gray-300  rounded " />
                <!-- <Field name="fullName" type="text" class="form-control" :class="{'border-red-600':errors.fullName}" /> -->
                 <span class="text-sm text-red-600">{{errors.fullName}}</span>
              </div>

              <div class="space-y-1 flex flex-col">
                <label class="text-lg font-medium text-gray-700 tracking-wide" >Email</label>
                <Field name="email"  id="email" v-model="variables.email" :class="{'border-red-600':errors.email}"  class="   w-full text-base px-4 py-2  border border-gray-300 rounded-lg  focus:outline-none focus:border-orange-400" type="" placeholder="mail@gmail.com"/>
                <span class="text-sm text-red-600">{{errors.email}}</span>
              </div>
              <div class="space-y-1 flex flex-col">
                <label class="text-lg font-medium text-gray-700 tracking-wide"> Password
                </label>
                <Field name="password" id="password" v-model="variables.password" :class="{'border-red-600':errors.password}"  class="w-full   content-center   text-base   px-4   py-2   border border-gray-300   rounded-lg focus:outline-none focus:border-orange-400" type="password" placeholder="Enter your password"/>
                <span class="text-sm text-red-600">{{errors.password}}</span>
              </div>
              <div class="space-y-1 flex flex-col">
                <label  class="text-lg font-medium text-gray-700 tracking-wide" >confirm </label>
                <Field name="confirm"  id="confirm-password" :class="{'border-red-600':errors.confirm}"  class="w-full content-center text-base   px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400" type="password" placeholder="confirm your password"/>
                <span class="text-sm text-red-600">{{errors.confirm}}</span>
              </div>

              <div  class="flex justify-center">
                 <button  :disabled="loading" type="submit" :class="{'bg-orange-300':loading,'hover:bg-orange-300':loading }"  class="w-44 flex justify-center bg-orange-400 hover:bg-orange-500 text-gray-100  p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-400"> 
                    Sign up
                    <span v-if="loading" a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                 </span>
                </button>
              </div>
            </div>
              </Form>
            <div class="mt-4">
              <p class="hover:text-orange-500 text-orange-400">
                <router-link to="/login">Have already an account</router-link>
              </p>
            </div>
            <div class="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" class="text-orange hover:text-orange-500">sky</a ></span >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (max-width: 660px) {
     .back {
        display: none;
        }
}
.auth{
     background-image:url("");
  }
</style>