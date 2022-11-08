<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import vClickOutside from "@/directives/click-outside.js";
import { useDebounceFn } from "@vueuse/core";
import HTextField from "./h-text-field.vue";

const emit = defineEmits(["update:modelValue", "update:search"]);
const props = defineProps({
  label: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
  text: {
    type: String,
    default: "name",
  },
  value: {
    type: String,
    default: "id",
  },
  search: {
    type: String,
  },
  modelValue: {
    type: [String, Array],
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: String,
  },
  placeHolder: {
    type: String,
  },
  supportClass: {
    type: String,
    default: "",
  },
});

const vv = ref(props.modelValue);
const selected = ref({});
const _placeholder = ref("");
const show = ref(false);

onBeforeMount(() => {
  if (props.multiple) {
    for (let v in props.modelValue) {
      selected.value[props.modelValue[v]] = true;
    }
  }
});
const placeholder = computed(() => {
  if (!props.multiple) {
    let v = props.items.find((e) => e[props.value] === vv.value);
    if (v) {
      selected.value = v[props.value];
      _placeholder.value = v[props.text];
    } else if (props.placeHolder) _placeholder.value = props.placeHolder;
    else _placeholder.value = "Select From Here";
  } else if (props.multiple) {
    let mv = [];

    vv.value.forEach((itm) => {
      props.items.forEach((it) => {
        if (it[props.value] == itm) {
          mv.push(it[props.text]);
        }
      });
    });
    if (mv.length)
      _placeholder.value = mv.reduce((prev, curr) => {
        return prev + ",  " + curr;
      });
    else if (props.placeHolder) _placeholder.value = props.placeHolder;
    else _placeholder.value = "Select From Here";
  }
  return _placeholder.value;
});

const select = (item) => {
  if (props.multiple) {
    selected.value[item[props.value]] = !selected.value[item[props.value]];
    let selectedd = [];
    for (let key of Object.keys(selected.value)) {
      if (selected.value[key]) {
        selectedd.push(key);
      }
    }
    vv.value = selectedd.map((itm) => itm);
    emit("update:modelValue", selectedd);
    return;
  }
  vv.value = item.id;
  emit("update:modelValue", item[props.value]);
  selected.value = item[props.value];
  _placeholder.value = item[props.text];
  show.value = false;
};
const close = () => {
  if (props.multiple) {
    return;
  }
  show.value = false;
};
// const outside = ()=> {
//   show.value = false;
// }
const outside = useDebounceFn(() => {
  show.value = false;
}, 300);
</script>
<template>
  <div class="relative font-body">
    <HTextField
      name="select"
      ref="input"
      @click="show = true"
      :trailingIcon="ChevronDownIcon"
      @blur="outside"
      :placeholder="placeholder"
      :supportClass="supportClass"
    >
      <template v-slot:label>
        <div class="text-secondary text-base font-bold mb-2 font-body">
          {{ label }}
        </div>
      </template>
    </HTextField>
    <ul
      v-show="show"
      class="absolute z-10 w-full bg-white border border-primary shadow -mt-6 max-h-56 rounded-md text-base overflow-auto"
    >
      <li
        v-for="item in items"
        :key="item.id"
        @click="select(item)"
        class="border-b select-none relative py-3 px-3 hover:bg-ilo-blue text-gray-600 cursor-pointer font-body"
      >
        <div class="flex items-center justify-between font-body">
          <span class="text-gray-600 font-semibold block truncate">{{
            item.name
          }}</span>
          <CheckIcon
            v-if="multiple && selected[item[value]]"
            class="w-5 h-5 text-gray-600"
          />
          <CheckIcon
            v-else-if="selected === item[value]"
            class="w-5 h-5 text-gray-600"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px white;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #00b4df;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00b4df;
}
</style>
