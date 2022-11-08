<script setup>
import { ref, watch, computed } from "vue";
import { useField } from "vee-validate";
import { useQuery, useResult, useQueryLoading } from "@vue/apollo-composable";
import vClickOutside from "@/directives/click-outside.js";
import Visible from "@/directives/visible";
import { XIcon } from "@heroicons/vue/outline";
import { useDebounceFn } from "@vueuse/core";

const emit = defineEmits(["update:modelValue", "update:selected"]);

const props = defineProps({
  id: String,
  client: String,
  trailingIcon: Function,
  query: Object,
  placeholder: String,
  label: String,
  clearable: Boolean,
  returnObject: Boolean,
  queryFilter: Object,
  headers: Object,
  modelValue: {
    type: [String, Number, Object],
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
  labelClass: {
    type: String,
    default: "",
    required: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
  limit: {
    type: Number,
    default: 10,
  },
  class: String,
  hideDetail: {
    type: Boolean,
    default: false,
    required: false,
  },
  supporter: {
    type: String,
  },
});

const show = ref(false);
const search = ref(undefined);
const filter = ref({});
const input = ref(null);

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const loading = useQueryLoading();

const f = computed(() => {
  return { ...filter.value, ...props.queryFilter };
});

const { result } = useQuery(
  props.query || ``,
  () => ({ filter: f.value, limit: props.limit }),
  () => ({
    clientId: props.client,
    fetchPolicy: "network-only",
    context: {
      headers: props.headers,
    },
  })
);

const items = useResult(result, [], (data) => {
  return data.items;
});

const outside = useDebounceFn(() => {
  show.value = false;
  search.value = undefined;
}, 300);

const set = (item) => {
  inputValue.value = item["name"];
  search.value = undefined;
  show.value = false;
  emit("update:modelValue", item);
  emit("update:selected", item.id);
};

const clear = () => {
  search.value = undefined;
  inputValue.value = "";
  show.value = false;
  emit("update:modelValue", undefined);
  emit("update:selected", undefined);
};
const open = () => {
  show.value = true;

  input.value.focus();
};
const queryList = useDebounceFn((newVal) => {
  if (search.value !== undefined) {
    filter.value.name = { _ilike: `${search.value}%` };
  } else {
    filter.value.name = {};
  }
}, 250);

watch(
  () => props.modelValue,
  (newVal) => {
    if (inputValue.value !== "") {
      inputValue.value = newVal;
      emit("update:modelValue", newVal);
      emit("update:selected", newVal.id);
    }
  }
);
</script>
<template>
  <div class="relative">
    <slot name="label"></slot>
    <div class="mt-1 relative rounded-md shadow-sm font-body">
      <button
        type="button"
        :id="id"
        @click="open"
        @focus="open"
        class="bg-white text-base relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1"
        :class="[
          errorMessage
            ? 'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500'
            : 'focus:ring-primary  focus:border-primary hover:border-primary border-gray-300',
          props.class ? props.class : '',
        ]"
      >
        {{
          (inputValue && inputValue.name) || props.placeholder || $t("select")
        }}
      </button>
      <div
        v-if="trailingIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <component class="h-5 w-5 text-gray-400" :is="trailingIcon"></component>
      </div>
      <div
        v-if="clearable"
        @click="clear"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <x-icon class="h-5 w-5 text-gray-400 cursor-pointer"></x-icon>
      </div>
    </div>

    <ul
      v-show="show"
      :class="supporter"
      class="absolute z-10 w-full bg-white border-r-2 border-l-2 border-b-2 border-primary-lite scrollbar scrollbar-thin scrollbar-track-rounded-full scrollbar-track-primary shadow-lg max-h-56 rounded-br-xl rounded-b-xl text-base overflow-auto"
    >
      <li class="flex justify-center items-center px-2">
        <input
          ref="input"
          @input="queryList"
          v-model="search"
          @blur="outside"
          type="text"
          name="email"
          id="email"
          class="my-1 shadow-sm focus:ring-primary focus:border-primary block sm:text-sm w-full border-gray-300 rounded-md font-body"
          :placeholder="$t('search')"
        />
      </li>
      <li class="h-1">
        <h-progress
          v-if="loading"
          class="rounded-xl w-full"
          color1="bg-primary-lite"
          color2="bg-primary"
          color3="bg-primary-dark"
          height="h-1"
        ></h-progress>
      </li>
      <li
        v-for="item in items"
        :key="item.id"
        @click="set(item)"
        class="border-b select-none relative py-3 px-3 hover:bg-blue-50 text-secondary cursor-pointer"
      >
        <div class="flex items-center justify-between">
          <span class="text-secondary font-semibold block truncate font-body">{{
            item.name
          }}</span>
          <!-- <CheckIcon
            v-if="multiple && selected[item[value]]"
            class="w-5 h-5 text-ilo-black"
          />
          <CheckIcon
            v-else-if="selected === item[value]"
            class="w-5 h-5 text-ilo-black"
          /> -->
        </div>
      </li>
    </ul>
    <p
      :visible="errorMessage"
      v-if="!props.hideDetail"
      class="mt-2 text-sm text-red-600 font-body"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>
