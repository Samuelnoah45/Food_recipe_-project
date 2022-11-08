<script setup>
import { watch } from "vue";
import { useField } from "vee-validate";
import Visible from "@/directives/visible";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
  supporterClass: {
    type: String,
    default: "text",
    required: false,
  },
  rows: {
    type: String,
    default: "8",
    required: false,
  },
  id: String,
  placeholder: String,
  label: String,
  labelClass: String,
  trailingIcon: Function,
  rules: String,
});
const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const set = (event) => {
  emit("update:modelValue", event.target.value);
};
watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);
</script>
<template>
  <div>
    <p
      :for="id"
      :class="labelClass"
      class="text-lg mb-2 capitalize font-body font-medium text-black"
    >
      {{ label
      }}<span v-show="rules !== undefined" class="ml-1 text-red-500">*</span>
    </p>
    <slot name="additional_title"></slot>
    <div class="mt-1 relative rounded-md shadow-sm font-body">
      <textarea
        v-model="inputValue"
        @input="set($event)"
        :type="type"
        :name="props.name"
        :rows="rows"
        :id="id"
        :class="{
          supporterClass,
          'focus:ring-primary  focus:border-primary hover:border-primary-2 border-gray-300 border-1':
            !errorMessage,
          'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500':
            errorMessage,
        }"
        class="block w-full pr-10 text-hahugray placeholder-primary focus:outline-none text-base rounded-md"
        :placeholder="placeholder"
        aria-invalid="true"
        aria-describedby="email-error"
      />
    </div>
    <p
      :visible="errorMessage"
      class="mt-2 text-sm text-red-600 font-body"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>
