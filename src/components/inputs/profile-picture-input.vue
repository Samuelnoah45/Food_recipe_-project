<script setup>
import { ref } from "vue";
import { XIcon } from "@heroicons/vue/solid";
import {
  CameraIcon,
  PhotographIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/vue/outline";
import fileUpload from "@/composables/file-upload";
import useErrorParser from "@/use/errorParser";
import useNotify from "@/use/notify";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  thumbnail: {
    type: String,
    default: "",
    required: true,
  },
});

const { notify } = useNotify();
const { parse } = useErrorParser();
const { uploadFile, uploadingFile, uploadError, fileUploaded } = fileUpload();

const useCamera = ref(false);
const photoTaken = ref(false);
const fileData = ref(undefined);
const file = ref([]);
const isCameraOpen = ref(false);
const video = ref(undefined);

const emit = defineEmits(["close", "update:thumbnail"]);

const close = () => {
  stopCamera();
  emit("update:thumbnail", fileData.value);
  photoTaken.value = false;
  file.value = undefined;
  emit("close");
};

const xClose = () => {
  stopCamera();
  photoTaken.value = false;
  file.value = undefined;
  emit("close");
};

const savePhoto = () => {
  uploadFile({
    file: Array.isArray(file.value) ? file.value[0] : file.value,
    folder: "agency",
  });
};

fileUploaded(({ data }) => {
  fileData.value = data.upload_files.secure_urls[0];
  close();
});

uploadError((err) => notify(parse(err)));

const onCamera = () => {
  useCamera.value = true;
  toggleCamera();
};

const stopCamera = () => {
  isCameraOpen.value = false;
  video.value &&
    video.value.srcObject &&
    video.value.srcObject.getTracks().forEach((track) => track.stop());
  useCamera.value = false;
  photoTaken.value = true;
};

const toggleCamera = async () => {
  if (isCameraOpen.value) {
    stopCamera();
  } else {
    isCameraOpen.value = true;
    const constraints = (window.constraints = {
      audio: false,
      video: true,
    });
    try {
      const nStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.value.srcObject = nStream;
    } catch (error) {
      notify(parse(error));
    }
  }
};

const takePhoto = () => {
  const canvas = document.createElement("canvas");
  canvas.height = 300;
  canvas.width = 300;
  const context = canvas.getContext("2d");
  context.drawImage(video.value, 0, 0, 300, 300);
  const data = canvas.toDataURL("image/png");
  file.value = data;
  stopCamera();
};

const retry = () => {
  photoTaken.value = false;
  useCamera.value = true;
  toggleCamera();
};
</script>

<template>
  <modal class="w-7/12 font-body" v-model="modelValue">
    <div class="flex flex-col">
      <div class="flex justify-end">
        <XIcon class="h-6 w-6 text-black cursor-pointer" @click="xClose" />
      </div>
      <div class="text-lg leading-6 font-bold text-center text-black">
        {{ $t("add_profile_picture") }}
      </div>
      <div v-if="useCamera !== true && photoTaken !== true">
        <div
          class="rounded-md shadow-md h-[50px] flex justify-center items-center mt-14 text-primary font-bold gap-4 cursor-pointer mx-12 hover:bg-gray-100"
          @click="onCamera"
        >
          <CameraIcon class="h-[18px] w-[18px]" />
          <div>{{ $t("use_camera") }}</div>
        </div>
        <div class="text-center font-bold text-secondary-6 my-6">
          {{ $t("or") }}
        </div>
        <div class="mx-12 mb-5">
          <h-file-upload
            :prependIcon="PhotographIcon"
            prependIconStyle="text-gray-200"
            fileTypes=" PNG, JPG, GIF up to 10MB"
            v-model="file"
            thumbnail
            accept="image/*"
          ></h-file-upload>
          <button
            class="rounded-md shadow-md h-[50px] flex justify-center items-center text-white font-bold gap-4 cursor-pointer w-full mb-5 leading-6 bg-primary mt-7 hover:bg-primary-dark"
            @click="savePhoto"
          >
            <div v-if="uploadingFile" class="flex justify-center">
              <DotsCircleHorizontalIcon
                class="animate-spin h-5 w-5"
              ></DotsCircleHorizontalIcon>
            </div>
            <div v-else>{{ $t("save") }}</div>
          </button>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-center mx-12"
        v-if="useCamera && photoTaken !== true"
      >
        <div
          class="h-auto w-[300px] my-12 border flex justify-center items-center"
          :class="isCameraOpen ? 'bg-white' : 'bg-secondary-8'"
        >
          <video ref="video" class="w-full" autoplay></video>
        </div>

        <div
          v-if="isCameraOpen"
          class="rounded-md shadow-md h-[50px] flex justify-center items-center text-primary font-bold gap-4 cursor-pointer w-full mb-5 leading-6 hover:bg-gray-100"
          @click="takePhoto"
        >
          <CameraIcon class="h-[18px] w-[18px]" />
          <div>{{ $t("capture") }}</div>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-center mx-14"
        v-if="photoTaken && useCamera !== true"
      >
        <div class="h-[300px] w-[300px] my-12 flex justify-center items-center">
          <img :src="file" class="object-contain rounded-lg w-full h-full" />
        </div>
        <div class="flex justify-center gap-5">
          <button
            class="rounded-md shadow-md py-3 flex justify-center items-center text-white font-bold gap-4 cursor-pointer px-10 mb-5 leading-6 bg-primary hover:bg-primary-dark font-body"
            @click="savePhoto"
          >
            <div v-if="uploadingFile" class="flex justify-center">
              <DotsCircleHorizontalIcon
                class="animate-spin h-5 w-5"
              ></DotsCircleHorizontalIcon>
            </div>
            <div v-else>{{ $t("save") }}</div>
          </button>
          <button
            class="rounded-md shadow-md py-3 flex justify-center items-center font-bold gap-4 cursor-pointer px-10 mb-5 leading-6 bg-gray-100 hover:bg-primary-dark hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-black focus:bg-primary font-body"
            @click="retry"
          >
            {{ $t("retry") }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
