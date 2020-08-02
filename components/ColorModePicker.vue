source: https://ja.nuxtjs.org/blog/going-dark-with-nuxtjs-color-mode/
<template>
  <div>
    <ul>
      <li
        v-for="color of colors"
        :key="color"
        @click="$colorMode.preference = color"
      >
        <component
          :is="`icon-${color}`"
          :class="getClasses(color)"
          @click="$colorMode.preference = color"
        />
      </li>
    </ul>
    <!-- <ColorScheme placeholder="..." tag="span">
      <b>{{ $colorMode.preference }}</b>
      <span
        v-if="$colorMode.preference === 'system'"
      >(<i>{{ $colorMode.value }}</i> mode detected)</span>
    </ColorScheme> -->
  </div>
</template>
<script>
import IconSystem from '@/assets/img/system.svg?inline';
import IconLight from '@/assets/img/light.svg?inline';
import IconDark from '@/assets/img/dark.svg?inline';
import IconSepia from '@/assets/img/sepia.svg?inline';

export default {
  components: {
    IconSystem,
    IconLight,
    IconDark,
    IconSepia
  },
  data () {
    return {
      colors: ['system', 'light', 'dark', 'sepia']
    };
  },
  methods: {
    getClasses (color) {
      // Does not set classes on ssr when preference is system (because we don't know the preference until client-side)
      if (this.$colorMode.unknown) {
        return {};
      }
      return {
        preferred: color === this.$colorMode.preference,
        selected: color === this.$colorMode.value
      };
    }
  }
};
</script>
<style scoped>
.feather {
  position: relative;
  top: 0px;
  cursor: pointer;
  padding: 3px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  margin: 0;
  border-radius: 5px;
  transition: all 0.1s ease;
}
.feather:hover {
  top: -3px;
}
.feather.preferred {
  border-color: var(--color-primary);
}
.feather.selected {
  color: var(--color-primary);
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  display: inline-block;
  padding: 5px;
}
p {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;
}
</style>
