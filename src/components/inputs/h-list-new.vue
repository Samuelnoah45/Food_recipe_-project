<script setup>
import { ref, computed, watch, onBeforeMount, toRefs } from 'vue'
// import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import { XIcon, CheckIcon } from '@heroicons/vue/outline'
import { useDebounceFn } from '@vueuse/core'
import { useField } from 'vee-validate'

const emit = defineEmits(['update:modelValue', 'update:selected', 'search','onSelectionFound'])
const props = defineProps({
  id: String,
  label: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    required: true,
    default() {
      return []
    },
  },
  text: {
    type: String,
    default: 'name',
  },
  value: {
    type: String,
    default: 'id',
  },
  search: {
    type: String,
  },
  modelValue: {
    type: [String, Array, Object],
    // default: () => [],
  },
  selected: {
    type: String,
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
  class: {
    type: String,
    default: '',
  },
  clearable: Boolean,
  trailingIcon: Function,
  rules: {
    type: String,
    default: '',
    required: false,
  },
  supporter: {
    type: String,
  },
  hideDetail: Boolean,
  searchPlaceholder: String,
  disabled: Boolean,
})

const { errorMessage, value: inputValue, meta } = useField(
  props.name,
  props.rules,
  {
    initialValue: props.modelValue,
  },
)

const vv = ref(props.selected)
const selected = ref({})
const _placeholder = ref('')
const show = ref(false)
const input = ref(null)
const search = ref(undefined)
const { items, disabled } = toRefs(props)

onBeforeMount(() => {
  if (props.multiple && inputValue.value) {
    for (let v in inputValue.value) {
      selected.value[inputValue.value[v]] = true
    }
  }
})

const placeholder = computed(() => {
  if (!props.multiple && items.value.length) {
    let v = items.value.find((e) => e[props.value] === props.selected)

    if (v) {
      selected.value = v[props.value]
      _placeholder.value = v[props.text]
      console.log('palaceholder 1', v)
      emit('onSelectionFound', v)
      return _placeholder.value
    } else if (props.placeHolder) _placeholder.value = props.placeHolder
    else _placeholder.value = 'Select'
  } else if (
    props.multiple &&
    inputValue.value &&
    inputValue.value.length > 0
  ) {
    let mv = []

    vv.value.forEach((itm) => {
      items.value.forEach((it) => {
        if (it[props.value] == itm) {
          mv.push(it[props.text])
        }
      })
    })
    if (mv.length)
      _placeholder.value = mv.reduce((prev, curr) => {
        console.log('palaceholder 2')

        return prev + ',  ' + curr
      })
    else if (props.placeHolder) _placeholder.value = props.placeHolder
    else {
      _placeholder.value = 'Select'
      inputValue.value = undefined
    }
  }
  console.log('palaceholder 3')
  return _placeholder.value
})

const select = (item) => {
  if (props.multiple) {
    selected.value[item[props.value]] = !selected.value[item[props.value]]
    let selectedd = []
    inputValue.value = []
    for (let key of Object.keys(selected.value)) {
      if (selected.value[key]) {
        inputValue.value.push(key)
        selectedd.push(key)
      }
    }
    vv.value = selectedd.map((itm) => itm)
    emit('update:modelValue', selectedd)
    return
  }
  vv.value = item.id
  inputValue.value = item[props.value]
  emit('update:selected', item[props.value])
  emit('update:modelValue', item)
  selected.value = item[props.value]
  _placeholder.value = item[props.text]
  show.value = false
  console.log('selected', item)
}

const outside = useDebounceFn(() => {
  show.value = false
}, 300)

const open = () => {
  show.value = true

  input.value.focus()
}
const queryList = () => {
  emit('search', search.value)
}

const clear = () => {
  search.value = undefined
  inputValue.value = ''
  selected.value = ''
  show.value = false
  emit('update:modelValue', undefined)
  emit('update:selected', undefined)
}
</script>

<template>
  <div class="relative">
    <slot name="label"></slot>
    <div class="mt-1 relative rounded-md shadow-sm font-body">
      <button
        type="button"
        :id="id"
        :disabled="disabled"
        @click="open"
        @focus="open"
        class="bg-white text-base relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1"
        :class="[
          errorMessage
            ? 'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500'
            : 'focus:ring-primary  focus:border-primary hover:border-primary border-gray-300',
          props.class ? props.class : '',
          disabled ? ' bg-gray-100 !cursor-not-allowed' : '',
        ]"
      >
        {{ (inputValue && inputValue.name) || placeholder || $t('select') }}
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
      class="absolute z-50 w-full bg-white border-r-2 border-l-2 border-b-2 border-primary-lite scrollbar scrollbar-thin scrollbar-track-rounded-full scrollbar-track-primary shadow-lg max-h-56 rounded-br-xl rounded-b-xl text-base overflow-auto"
    >
      <li class="flex justify-center items-center px-2">
        <input
          ref="input"
          @input="queryList"
          v-model="search"
          @blur="outside"
          autocomplete="off"
          type="text"
          :name="props.name"
          id="email"
          class="my-1 shadow-sm focus:ring-primary focus:border-primary block sm:text-sm w-full border-gray-300 rounded-md font-body"
          :placeholder="props.searchPlaceholder || $t('search')"
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
        @click="select(item)"
        :class="{ 'bg-blue-50': placeholder == item.name }"
        class="border-b select-none relative py-3 px-3 hover:bg-blue-50 text-secondary cursor-pointer"
      >
        <div class="flex items-center justify-between">
          <span class="text-secondary font-semibold block truncate font-body">
            {{ item.name }}
          </span>
          <span class="font-body text-sm text-gray-400 font-medium pr-3">
            {{ item.identifier ? item.identifier : '' }}
          </span>
          <CheckIcon v-if="placeholder == item.name" class="w-4 h-4" />
        </div>
      </li>
      <div
        v-if="!loading && items.length === 0"
        class="text-black test-lg flex justify-center items-center pb-2"
      >
        <slot name="option" :item="search" />
      </div>
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
