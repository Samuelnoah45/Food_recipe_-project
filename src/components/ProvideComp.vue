<script setup>
import {provide} from 'vue'
import inject from './injectComp.vue'
provide('my-key', 'some-data')

</script>
<template>
    <div>
      <inject/>
    </div>
  </template>
  
