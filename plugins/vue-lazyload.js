import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import defaultEyeCatch from '~/assets/img/defaultEyeCatch.jpg'

Vue.use(VueLazyload, {
  loading: defaultEyeCatch
})
