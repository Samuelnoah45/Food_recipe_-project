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
            <div class="bg-orange-600 flex justify-center items-center text-white p-2 rounded shadow-md">
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
                <div class="flex-1 ">

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
                        Sign in
                    </button>
                    <button v-else type="submit" class=" w-44 flex justify-center bg-orange-400/70 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer ">
                        sign in
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
