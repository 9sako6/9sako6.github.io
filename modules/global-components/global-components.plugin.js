/* eslint-disable */
// source: https://github.com/nuxt/nuxtjs.org/blob/master/modules/components/global-components.plugin.js
import Vue from 'vue'
<% options.globalComponents.forEach(({ name, path }) => { %>import <%= name %> from '<%= path %>'
<% }) %>

<% options.globalComponents.forEach(({ name }) => { %>Vue.component(<%= name %>.name || '<%= name %>', <%= name %>)
<% }) %>
