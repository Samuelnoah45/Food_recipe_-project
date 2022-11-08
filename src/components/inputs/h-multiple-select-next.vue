<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { CheckIcon } from "@heroicons/vue/solid";
import { useDebounceFn } from "@vueuse/core";
import { useField } from "vee-validate";
import { useQuery, useResult, useQueryLoading } from "@vue/apollo-composable";

const emit = defineEmits([
  "update:modelValue",
  "update:search",
  "update:selected",
]);
const props = defineProps({
  query: Object,
  queryFilter: Object,
  headers: Object,
  rules: {
    type: String,
    default: "",
    required: false,
  },
  label: String,
  name: {
    type: String,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "name",
  },
  value: {
    type: String,
    default: "id",
  },
  modelValue: {
    type: [String, Array],
    default: undefined,
  },
  placeHolder: String,
  supportClass: {
    type: String,
    default: "",
  },
  trailingIcon: {
    type: Function,
    default: undefined,
  },
  leadingIcon: {
    type: Function,
    default: undefined,
  },
  hideDetails: Boolean,
  disabled: [Boolean],
});

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const loading = useQueryLoading();

const vv = ref(inputValue.value);
const selected = ref({});
const _placeholder = ref("");
const show = ref(false);
const search = ref(undefined);
const filter = ref({});

onBeforeMount(() => {
  if (props.multiple && inputValue.value) {
    for (let v in inputValue.value) {
      selected.value[inputValue.value[v]] = true;
    }
  }
});

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

const queryList = useDebounceFn((newVal) => {
  if (search.value !== undefined) {
    filter.value.name = { _ilike: `%${search.value}%` };
  } else {
    filter.value.name = {};
  }
}, 250);

const placeholder = computed(() => {
  if (!props.multiple) {
    let v = items.value.find((e) => e[props.value] === vv.value);
    if (v) {
      selected.value = v[props.value];
      _placeholder.value = v[props.text];
    } else if (props.placeHolder) _placeholder.value = props.placeHolder;
    else _placeholder.value = "Select From Here";
  } else if (
    props.multiple &&
    inputValue.value &&
    inputValue.value.length > 0
  ) {
    let mv = [];

    vv.value.forEach((itm) => {
      items.value.forEach((it) => {
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
  } else {
    inputValue.value = undefined;
    _placeholder.value = "Select From Here";
  }
  return _placeholder.value;
});

const select = (item) => {
  search.value = undefined;
  filter.value.name = { _ilike: `%%` };
  if (props.multiple) {
    selected.value[item[props.value]] = !selected.value[item[props.value]];
    let selectedd = [];
    inputValue.value = [];
    for (let key of Object.keys(selected.value)) {
      if (selected.value[key]) {
        inputValue.value.push(key);
        selectedd.push(key);
      }
    }
    vv.value = selectedd.map((itm) => itm);
    emit("update:modelValue", selectedd);
    return;
  }
  vv.value = item.id;
  inputValue.value = item[props.value];
  emit("update:modelValue", item[props.value]);

  emit("update:selected", item);
  selected.value = item[props.value];
  _placeholder.value = item[props.text];
  show.value = false;
};

const outside = useDebounceFn(() => {
  show.value = false;
  search.value = undefined;
  filter.value.name = { _ilike: `%%` };
}, 300);
</script>
<template>
  <div>
    <slot name="label"></slot>
    <div class="relative">
      <div
        v-if="props.leadingIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <component
          class="h-5 w-5 text-gray-400"
          :is="props.leadingIcon"
        ></component>
      </div>
      <input
        name="select"
        :disabled="props.disabled"
        ref="input"
        @click="show = true"
        autocomplete="off"
        v-model="search"
        @input="queryList"
        step="any"
        @blur="outside"
        :name="props.name"
        :placeholder="placeholder"
        :class="[
          !errorMessage
            ? 'focus:ring-primary  focus:border-primary hover:border-secondary-2 border-gray-300 border-1'
            : 'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500',
          props.leadingIcon ? 'pl-10' : '',
          props.trailingIcon ? 'pr-10' : '',
          supportClass ? supportClass : '',
        ]"
        class="block w-full text-secondary focus:outline-none text-base border my-1 rounded-md px-3 py-2"
      />
      <div
        v-if="props.trailingIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <component
          class="h-5 w-5 text-gray-400"
          :is="props.trailingIcon"
        ></component>
      </div>
      <ul
        v-show="show"
        class="absolute z-10 w-full bg-white border border-primary shadow max-h-56 rounded-md text-base overflow-auto"
      >
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
          @click="select(item)"
          class="border-b select-none relative py-3 px-3 hover:bg-ilo-blue text-gray-600 cursor-pointer"
        >
          <div class="flex items-center justify-between">
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
    <p
      v-if="!hideDetails"
      :visible="errorMessage"
      class="mt-2 text-sm text-red-600"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
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
  background: #009688;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #009688;
}
</style>
