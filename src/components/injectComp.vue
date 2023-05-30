<script setup>
import {inject} from 'vue'
const value = inject('my-key')

</script>

<template>
    <div id="provide-test">
        {{ value }}
    </div>
</template>