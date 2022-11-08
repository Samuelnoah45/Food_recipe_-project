<script setup>
import { watch, ref } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  name: String,
  label: String,
  description: String,
  hideDetails: Boolean,
});

const checkbox = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    checkbox.value = newVal || false;
  }
);

watch(
  () => checkbox.value,
  (newVal) => {
    emit("update:modelValue", newVal);
  }
);
</script>
<template>
  <div class="text-md" v-if="!props.hideDetails">&nbsp;</div>
  <div class="relative flex items-center">
    <div class="flex items-center h-5">
      <input
        v-model="checkbox"
        :id="name"
        :aria-describedby="name"
        :name="name"
        type="checkbox"
        class="focus:ring-primary h-4 w-4 text-primary border-primary-3 rounded text-md"
      />
    </div>
    <div class="ml-3 text-lg leading-6">
      <label :for="name" class="font-medium text-black">
        {{ props.label }}
      </label>
      <p v-if="props.description" id="name" class="text-text-black text-sm">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
