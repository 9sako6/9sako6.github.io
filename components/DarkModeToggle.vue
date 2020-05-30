<template>
  <div class="flex justify-center">
    <div class="cursor-pointer w-20 m-5" @click="toggleMode">
      <span
        :class="mode === 'dark' ? '' : 'hidden'"
        class="flex leading-5 justify-center p-2 bg-gray-900 hover:bg-blue-900 rounded-full"
      >
        <Moon class="h-5 w-5" />
        Dark
      </span>
      <span
        :class="mode === 'light' ? '' : 'hidden'"
        class="flex leading-5 justify-center p-2 bg-gray-200 hover:bg-orange-100 rounded-full"
      >
        <Sun class="h-5 w-5" />
        Light
      </span>
    </div>
  </div>
</template>
<script>
import Sun from '@/components/svg/Sun';
import Moon from '@/components/svg/Moon';
export default {
  components: {
    Sun,
    Moon
  },
  props: {
    mode: String,
    toggleMode: Function
  }
};
</script>
