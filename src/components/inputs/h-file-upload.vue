<script setup>
import { ref, computed } from "vue";
import hDragAndDrop from "./h-drag-and-drop.vue";

const emit = defineEmits(["update:modelValue", "itemChange"]);

const props = defineProps({
  modelValue: {
    type: [Array, Object],
  },
  accept: {
    type: String,
    default: undefined,
  },
  prependIcon: Function,
  limit: { type: Number, default: 1 },
  text: { type: String },
  fileTypes: { type: String },
  thumbnail: { type: Boolean, default: false },
  customizableText: { type: Boolean, default: false },
  prependIconStyle: String,
  preview: {
    type: Boolean,
    default: false,
  },
});

const input = ref(null);

const rawFiles = ref([]);

const dataUrls = ref([]);

const previewSrc = ref(undefined);

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const open = () => {
  input.value.click();
};

const drop = (event) => {
  rawFiles.value = [];
  select({ target: { files: event.dataTransfer.files } });
};

const files = computed(() => {
  const fs = [];
  for (let i = 0; i < rawFiles.value.length; i++) {
    fs.push({
      name: rawFiles.value[i].name,
      size: formatBytes(rawFiles.value[i].size),
      dataUrl: dataUrls.value[i],
    });
  }
  return fs;
});

const readFile = (file) => {
  return new Promise(function (resolve, reject) {
    const fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
};

const select = async (event) => {
  if (rawFiles.value.length) {
    rawFiles.value.length = 0;
  }

  if (event.target.files.length) {
    previewSrc.value = URL.createObjectURL(event.target.files[0]);
  }

  const rf = event.target.files || [];
  for (let j = 0; j < rf.length; j++) {
    if (j <= props.limit - 1) {
      rawFiles.value.push(rf[j]);
    } else {
      break;
    }
  }

  const readers = [];
  for (let i = 0; i < rawFiles.value.length; i++) {
    readers.push(readFile(rawFiles.value[i]));
  }

  dataUrls.value = await Promise.all(readers);

  emit("update:modelValue", dataUrls.value);
  emit("itemChange");
};

const clearFile = () => {
  open();
};

const uploadNewAfterPreview = () => {
  previewSrc.value = undefined;
  clearFile();
};
</script>
<template>
  <input
    ref="input"
    type="file"
    class="hidden"
    :accept="props.accept"
    @change="select"
    :multiple="limit > 1"
  />
  <h-drag-and-drop v-if="!(props.preview && previewSrc)">
    <template #default="{ drag, hover }" v>
      <div
        class="flex border-dashed border-2 border-light-blue-500 rounded-lg h-60 text-center"
        :class="{ 'shadow-xl': hover }"
        @drop.prevent="drop"
      >
        <div class="m-auto" v-if="!drag && files.length == 0">
          <component
            :is="prependIcon"
            :class="prependIconStyle ? prependIconStyle : 'text-primary'"
            class="md:h-16 h-10 mb-5 w-auto text-primary mx-auto"
          />

          <slot name="icon"></slot>

          <div class="flex" v-if="!customizableText">
            <span
              class="cursor-pointer text-primary font-bold capitalize"
              :class="props.textStyle"
              @click="open"
              >{{ props.text || $t("upload_a_file") }}
            </span>
            <div class="pl-1">
              {{ $t("or") }}
            </div>
            <div class="pl-1">
              {{ $t("drag_and_drop") }}
            </div>
          </div>

          <div v-if="customizableText"><slot></slot></div>

          <div class="text-md font-thin pt-3">
            {{ props.fileTypes }}
          </div>
        </div>
        <div v-else-if="drag" class="m-auto font-bold text-primary">
          {{ $t("release_now") }}
        </div>
        <div class="m-auto" v-else-if="thumbnail && files.length > 0">
          <img :src="files[0].dataUrl" class="h-56 object-contain" alt="" />
        </div>
        <div v-else class="m-auto">
          <div class="flex justify-center w-full">
            <button
              class="bg-primary text-white px-4 h-8 -ml-5 py-1 rounded-full"
              @click="clearFile"
              type="button"
            >
              {{ $t("upload_new") }}
            </button>
          </div>
          <div
            class="shadow-lg py-2 mt-10 px-4 rounded-lg text-sm font-bold text-hahugray flex"
            v-for="(file, index) in files"
            :key="index"
          >
            {{ file.name }} <span class="text-xs">({{ file.size }})</span>
          </div>
        </div>
      </div>
    </template>
  </h-drag-and-drop>

  <div v-if="previewSrc && props.preview" class="flex justify-center group">
    <div class="bg-gray-50 rounded-2xl p-5">
      <img
        v-if="previewSrc !== ''"
        :src="previewSrc"
        alt="your image"
        class="object-cover rounded-2xl w-72 h-64 group-hover:blur-sm group-hover:transition-all ease-in-out hover:delay-500"
      />
    </div>

    <button
      class="bg-primary text-white px-6 py-2 py-1 rounded-xl hidden group-hover:flex absolute hover:cursor-pointer mt-28 z-10 group-hover:transition-all ease-in-out delay-150"
      @click="uploadNewAfterPreview"
      type="button"
    >
      Change
    </button>
  </div>
</template>
