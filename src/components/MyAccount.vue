<script setup>
import {
    useUserStore
} from '../store/userInfo'
import changePassword from '../graphql/mutation/changePassword.gql'
import {
    useQuery,
    useMutation
} from '@vue/apollo-composable';
import {
    ref
} from 'vue';
const userStore = useUserStore();
const newPassword = ref("");
const oldPassword = ref("");
const notification = ref(false)
const changed = ref(false)
const userEmail = userStore.user.email

const {
    mutate: change,
    loading,
    onDone,
    result
} = useMutation(changePassword, () => ({

    variables: {
        email: userEmail,
        newPassword: newPassword.value,
        oldPassword: oldPassword.value,

    }
}))
onDone(result => {
    console.log(result.data.changePassword.message);
    if (result.data.changePassword.message == "success") {
        changed.value = true;
    } else {
        changed.value = false;

    }

    notification.value = true;
})
</script>
<template>
<div class="max-w-fit">
    <div class="grow  flex-none bg-white shadow-lg">
        <!-- //profile setting -->
        <div class="flex justify-between p-8">
            <div class="text-3xl font-serif text-black font-bold">Profile Settings</div>
            <div class="bg-orange-400 flex justify-center items-center text-white p-2 font-semibold  rounded shadow-md">
                <button disabled class="">Save Change</button></div>
        </div>
        <div class="p-8 ">
            <div class="text-3xl flex  justify-between font-serif text-black font-bold border-2 p-4">
                <div>
                    About Me
                </div>
                <div class="">
                    <i class="fa-solid fa-circle-chevron-down"></i>
                </div>
            </div>
            <div class="border-x-2 border-b-2 p-6 md:flex-row flex-col flex space-x-4 w-full">
                <div class="flex-1 space-y-10">
                    <div class="flex flex-col ">
                        <label for="name">Full Name</label>
                        <input class="border-2 p-2 border-gray-300" type="text" :value="userStore.user.name">
                    </div>
                    <div class="flex flex-col">
                        <label for="name">Email</label>
                        <input class="border-2 p-2 border-gray-300" disabled type="text" :value="userStore.user.email">
                    </div>
                </div>
                <div class="flex-1 flex ">
                <div class="flex basis-1/4 items-center justify-center flex-col space-y-8 w-full">
                    <div class="font-bold">change profile image</div>
                        <label class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300" >
                            <div class="flex flex-col items-center justify-center pt-7">
                             <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                    </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        Select a images </p>
                                </div>
                                <input  @change="handleImage" class="opacity-0" ref="file" type="file" accept="image/*" multiple name="image" id=""/>
                            </label>
                    </div>
                </div>

            </div>
        </div>

        <div class="p-8 ">
            <div class="text-3xl flex   justify-between font-serif text-black font-bold border-2 p-4">
                <div>
                    Change Password
                </div>
                <div class="">
                    <i class="fa-solid fa-circle-chevron-down"></i>
                </div>
            </div>

            <div class="border-x-2  px-6 md:flex-row flex-col flex md:space-x-4 space-x-0 w-full">
                <div class="flex-1 space-y-10">
                    <div class="flex flex-col">
                        <label for="name">Old password</label>
                        <input v-model="oldPassword" class="border-2 p-2 border-gray-300" type="password">
                    </div>
                </div>
                <div class="flex-1 space-y-10">
                    <div class="flex flex-col">
                        <label for="name">New password</label>
                        <input v-model="newPassword" class="border-2 p-2 border-gray-300" type="password">
                    </div>
                </div>

            </div>
            <div class="border-x-2 border-b-2 p-6 flex justify-center">
                <div class="flex flex-col space-y-3">
                    <div v-if="notification">
                        <div v-if="changed" class="text-green-600 text-lg">changed successfully</div>
                        <div v-else class="text-red-600 text-lg">Incorrect old password</div>
                    </div>
                    <button v-if="!loading" @click="change" type="submit" class=" w-44 flex  justify-center  bg-orange-400  hover:bg-orange-500  text-gray-100  p-3  rounded-full  tracking-wide  font-semibold shadow-lgcursor-pointer">
                        change
                    </button>
                    <button v-else type="submit" class=" w-44 flex justify-center bg-orange-400/70 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer ">
                        change
                        <span a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                        </span>
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<style>
label {
    font-size: large;
    font-weight: 600;
}
</style>
