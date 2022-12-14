<script setup>
import { ref, watch } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: [String, Date],
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  id: String,
  rules: {
    type: String,
    default: "",
    required: false,
  },
  label: String,
  labelClass: {
    type: String,
    default: () => "",
    required: false,
  },
  placeholder: String,
  disabled: Boolean,
  min: [String, Date],
  max: [String, Date],
  value: {
    type: [String, Date],
    default: () => new Date("01-01-2001"),
    required: false,
  },
  svgIcon: {
    type: String,
    default:
      '<svg xmlns="http://www.w3.org/2000/svg" style="color:#00B4DF;transform:scale(.5)" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
    required: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const minDate = ref(props.min);
const maxDate = ref(props.max);

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);

const input = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div>
    <label :class="labelClass" :for="id" class="block"
      >{{ label }}
      <span v-show="rules !== ''" class="text-red-500">*</span></label
    >
    <div class="relative rounded-md shadow-sm">
      <input
        v-model="inputValue"
        :disabled="disabled"
        :style="`background: white url('data:image/svg+xml,${svgIcon}') right no-repeat;`"
        type="date"
        @input="input($event)"
        @change="input($event)"
        :id="id"
        :min="minDate"
        :max="maxDate"
        :class="{
          'pointer-events-none shadow-none': disabled,
          'focus:ring-primary  focus:border-primary hover:border-primary-2 border-gray-300 border-1':
            !errorMessage,
          'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500':
            errorMessage,
        }"
        class="block w-full text-secondary placeholder-primary focus:outline-none text-base rounded-md"
        aria-invalid="true"
        aria-describedby="date-error"
        :placeholder="props.placeholder"
      />
    </div>
    <p
      :visible="errorMessage"
      class="mt-2 text-sm text-red-600"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>

<style scoped>
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  opacity: 0;
  padding: 5px;
  width: 100%;
  cursor: pointer;
}
</style>
