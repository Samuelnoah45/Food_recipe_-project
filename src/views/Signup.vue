
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMutation, useQuery } from '@vue/apollo-composable'
import register from '../graphql/auth/signup.gql'
import NavBar from '../components/NavBar.vue'
    const router = useRouter();
    const show=ref(false);

const variables=ref({
     email:"",
     password:"",
     name:""

})
const confirmPass = ref();
const queryOptions = ref({ enabled: false })
    
const { result, onResult ,loading} = useQuery(register, variables, queryOptions);
const confirmPassword = () =>
{
    if(variables.value.password==confirmPass.value) {
        queryOptions.value.enabled = true
        console.log(variables.value.password)
        console.log(confirmPass.value);

     } 
   else{

      console.log("sky");
    }

onResult((result)=>{

  if(result.data!=null){

       const data=result.data.Signup
       console.log(data.token);
 
      setCookie("foodRecipeUser",data.token,30);
      show.value=true
      router.push({ name: "Home" });
   }

      })
}


//setcookie function
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

console.log("womcwnc");

</script>

<template>
  <div class="register">
    <nav-bar></nav-bar>
    <div
      class=" auth bg-no-repeat bg-cover bg-center relative"
      style="
             "
    >
      <div
        class="
          back
          absolute
          bg-gradient-to-l
          from-orange-600
          to-orange-400
          opacity-75
          inset-0
          z-0
        "
      ></div>

      <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div class="flex justify-center self-center z-10">
          <div class="p-12 bg-white mx-auto rounded-3xl w-100">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">Sign up</h3>
              <p class="text-gray-500">Please fill the from to register.</p>
            </div>

            <div class="space-y-3">
              <div class="space-y-2">
                <label for="fullName"> Full Name </label>
                <input
                  v-model="variables.name"
                  type="text"
                  placeholder="Enter full name"
                  class="
                    px-4
                    py-2
                    w-full
                    text-base
                    border border-gray-300
                    rounded
                  "
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 tracking-wide"
                  >Email</label
                >
                <input
                  v-model="variables.email"
                  class="
                    w-full
                    text-base
                    px-4
                    py-2
                    border border-gray-300
                    rounded-lg
                    focus:outline-none focus:border-orange-400
                  "
                  type=""
                  placeholder="mail@gmail.com"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="mb-5 text-sm font-medium text-gray-700 tracking-wide"
                >
                  Password
                </label>
                <input
                  v-model="variables.password"
                  class="
                    w-full
                    content-center
                    text-base
                    px-4
                    py-2
                    border border-gray-300
                    rounded-lg
                    focus:outline-none focus:border-orange-400
                  "
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div class="space-y-1">
                <label
                  class="mb-5 text-lg font-medium text-gray-700 tracking-wide"
                >
                  confirm
                </label>
                <input
                  v-model="confirmPass"
                  class="
                    w-full
                    content-center
                    text-base
                    px-4
                    py-2
                    border border-gray-300
                    rounded-lg
                    focus:outline-none focus:border-orange-400
                  "
                  type="password"
                  placeholder="confirm your password"
                />
              </div>

              <div  class="flex justify-center">
                 <button
                 v-if="!loading"
                  @click="confirmPassword()"
                  class="
                    w-44
                    flex
                    justify-center
                    bg-orange-400
                    hover:bg-orange-500
                    text-gray-100
                    p-3
                    rounded-full
                    tracking-wide
                    font-semibold
                    shadow-lg
                    cursor-pointer
                    transition
                    ease-in
                    duration-400
                  "
                >
                  Sign up
                </button>
            <button
                v-else
                  type="submit"
                  class="
                    w-44
                    flex
                    justify-center
                    bg-orange-400/70
                   
                    text-gray-100
                    p-3
                    rounded-full
                    tracking-wide
                    font-semibold
                    shadow-lg
                    cursor-pointer
                    transition
                    ease-in
                    duration-400
                  "
                >
                sign up
      <span a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
              </span>    
                </button>
                
              </div>
            </div>
            <div class="mt-4">
              <p class="hover:text-orange-500 text-orange-400">
                <router-link to="/login"
                  >Have already an account
                </router-link>
              </p>
            </div>
            <div class="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a
                  href="https://codepen.io/uidesignhub"
                  rel=""
                  target="_blank"
                  title="Ajimon"
                  class="text-orange hover:text-orange-500">sky</a ></span >
           
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