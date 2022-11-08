<script setup>
import { ref } from "vue";
import { XIcon } from "@heroicons/vue/solid";
import fingerPrint from "@/composables/finger-print-service";
import useNotify from "@/use/notify";
import i18n from "@/plugins/i18n";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  fingerprint: {
    type: Object,
    default: {},
    required: true,
  },
});

const fingersName = {
  1: "Left little finger",
  2: "Left ring finger",
  3: "Left middle finger",
  4: "Left index finger",
  5: "Left thumb finger",
  6: "Right thumb finger",
  7: "Right index finger",
  8: "Right middle finger",
  9: "Right ring finger",
  10: "Right little finger",
};

const t = i18n.global.t;
const { FPCapture, FPErrorCodeToString } = fingerPrint();
const { notify } = useNotify();

const emit = defineEmits(["close", "update:fingerprint"]);

const image = ref(undefined);
const indexNumber = ref(undefined);
const isScanning = ref(false);
const imageQ = ref(undefined);

const reset = () => {
  image.value = undefined;
  indexNumber.value = undefined;
  imageQ.value = undefined;
};

const captureFingerprint = async (finger) => {
  isScanning.value = true;
  indexNumber.value = finger;

  const R = await FPCapture();

  if (R.data.ErrorCode !== 0) {
    notify({
      title: t("error_in_fingerprint_scanner"),
      description: FPErrorCodeToString(R.data.ErrorCode),
      cardClass: "bg-red-100",
    });
    isScanning.value = false;
    reset();
  } else {
    isScanning.value = false;
    image.value = R.data.BMPBase64;
    imageQ.value = R.data.ImageQuality;
  }
};

const close = () => {
  reset();
  emit("close");
};

const send = () => {
  emit("update:fingerprint", {
    image: image.value,
    index: indexNumber.value,
  });

  emit("close");
  reset();
};
</script>

<template>
  <modal class="w-3/4 font-body" v-model="modelValue">
    <div>
      <div class="flex items-center mb-0 text-black px-5">
        <p class="text-xl leading-6 font-bold text-left font-body">
          {{ $t("add_fingerprint") }}
        </p>

        <XIcon class="h-7 w-7 cursor-pointer absolute right-5" @click="close" />
      </div>
    </div>

    <div class="px-10 pt-6">
      <p
        class="font-body text-black text-lg leading-6 text-center mb-3"
        v-if="!isScanning && !image"
      >
        {{ $t("choose_a_finger_to_scan") }}
      </p>
      <div class="flex relative justify-center" v-if="!isScanning">
        <template v-for="f in 10" :key="f">
          <div
            @click="captureFingerprint(f)"
            :class="[`f${f} finger`, f === indexNumber ? 'active' : undefined]"
          ></div>
        </template>
        <img src="/images/hands.png" class="object-contain mt-3 h-72" />
      </div>
      <div v-else class="flex justify-center items-center my-5">
        <div
          class="w-20 h-20 border-t-4 border-b-4 border-primary rounded-full animate-spin"
        ></div>
      </div>
      <div class="h-0.5 bg-secondary-line my-6"></div>
      <div class="text-black font-bold text-lg leading-6 font-body">
        {{ $t("selected_finger") }}
        <span class="text-primary font-medium pl-6 font-body">{{
          indexNumber ? fingersName[indexNumber] : "None"
        }}</span>
      </div>

      <div
        class="flex flex-col justify-center items-center gap-3 my-4"
        v-if="image && imageQ"
      >
        <div
          class="rounded-full bg-primary px-3 py-1 text-xs c text-white w-max font-body"
        >
          {{ imageQ }}% {{ $t("quality") }}
        </div>

        <img
          :src="`data:image/bmp;base64,${image}`"
          class="object-contain h-[200px]"
        />
      </div>
    </div>

    <div class="flex justify-end gap-6 mt-10">
      <button
        class="rounded-md shadow-md py-3 flex justify-center items-center text-white font-bold gap-4 cursor-pointer px-16 leading-6 bg-primary hover:bg-primary-dark font-body disabled:bg-gray-300 disabled:pointer-events-none disabled:text-gray-400 font-body"
        @click="send"
        :disabled="!image"
      >
        {{ $t("save") }}
      </button>
      <button
        v-if="!image"
        class="rounded-md shadow-md py-3 flex justify-center items-center font-bold gap-4 cursor-pointer px-16 leading-6 bg-white hover:bg-primary-dark hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-primary focus:bg-primary font-body"
        @click="close"
      >
        {{ $t("cancel") }}
      </button>

      <button
        v-else
        class="rounded-md shadow-md py-3 flex justify-center items-center font-bold gap-4 cursor-pointer px-16 leading-6 bg-white hover:bg-primary-dark hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-primary focus:bg-primary font-body"
        @click="reset"
      >
        {{ $t("recapture") }}
      </button>
    </div>
  </modal>
</template>

<style scoped>
.finger {
  width: 35px;
  height: 35px;
  border-radius: 25%;
  border: 1px solid #00566d;
  margin: 0;
  background-color: #00b4df;
  position: absolute;
  opacity: 0.4;
}
.finger:hover,
.finger.active {
  background-color: green;
  opacity: 0.6;
  cursor: pointer;
}
.f1 {
  top: 72px;
  left: 67px;
  transform: rotate(-40deg);
}
.f2 {
  top: 26px;
  left: 107px;
  transform: rotate(-10deg);
}
.f3 {
  top: 13px;
  left: 148px;
  transform: rotate(-6deg);
}
.f4 {
  top: 29px;
  left: 197px;
  transform: rotate(12deg);
}
.f5 {
  top: 137px;
  left: 248px;
  transform: rotate(68deg);
}
.f6 {
  top: 137px;
  left: 293px;
  transform: rotate(-68deg);
}
.f7 {
  top: 30px;
  left: 344px;
  transform: rotate(-10deg);
}
.f8 {
  top: 13px;
  left: 392px;
  transform: rotate(6deg);
}
.f9 {
  top: 26px;
  left: 434px;
  transform: rotate(10deg);
}
.f10 {
  top: 70px;
  left: 474px;
  transform: rotate(40deg);
}
</style>
