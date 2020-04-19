<template>
  <button
    class="relative overflow-hidden px-4 flex items-center bg-gray-200 dark:bg-dark-surface dark:text-dark-onSurfaceSecondary rounded-full h-10 outline-none text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary transition-colors duration-300 ease-linear"
    @click="setCurrentTheme"
  >
    <span
      class="relative mr-1 overflow-hidden inline-block w-6 h-6 flex items-center justify-center"
    >
      <moon class="w-6 h-6 absolute" :class="$theme.value === 'dark' ? 'show' : 'hide'" />
      <sun class="w-6 h-6 absolute" :class="$theme.value === 'light' ? 'show' : 'hide'" />
    </span>
    <transition name="from-bottom-to-bottom" mode="out-in">
      <span v-if="$theme.value === 'dark'" key="dark" class="inline-block font-medium mr-1">Dark</span>
      <span
        v-else-if="$theme.value === 'light'"
        key="light"
        class="inline-block font-medium mr-1"
      >Light</span>
    </transition>
  </button>
</template>

<script>
import Sun from '~/components/svg/Sun'
import Moon from '~/components/svg/Moon'

export default {
  components: {
    Sun,
    Moon
  },
  methods: {
    setCurrentTheme () {
      this.$theme.set(this.$theme.value === 'dark' ? 'light' : 'dark')
      console.log(this.$theme)
    }
  },
}
</script>
<style lang="scss" scoped>
.show {
  animation: show-icon 300ms forwards;
}

.hide {
  animation: hide-icon 300ms forwards;
}

@keyframes show-icon {
  from {
    opacity: 0;
    transform: scaleY(0);
    // transform: translate3d(-100%, 10px, 0) rotate(-180deg) scale3d(0.5, 0.5, 0.5);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
    // transform: translate3d(0, 0, 0) rotate(0) scale3d(1, 1, 1);
  }
}

@keyframes hide-icon {
  from {
    opacity: 1;
    transform: scaleY(1);
    // transform: translate3d(0, 0, 0) rotate(0) scale3d(1, 1, 1);
  }
  to {
    opacity: 0;
    transform: scaleY(0);
    // transform:  translate3d(100%, 10px, 0) rotate(180deg) scale3d(0.5, 0.5, 0.5);
  }
}
</style>