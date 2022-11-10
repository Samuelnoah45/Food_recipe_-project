<script setup>
import {  useUserStore} from '../store/userInfo'
const userStore = useUserStore();
console.log(useUserStore.user);
</script>

<template>
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
	<h1 class="text-3xl font-extrabold text-white tracking-widest">Authorization</h1>
	<div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
	
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
             <p class="text-white">verification link has been sent to your email please verify you email</p>
        </span>
      </a>
    </button>
</main>
</template>

<style scoped></style>