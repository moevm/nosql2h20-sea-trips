import Vue from 'vue';
import LoadScript from "vue-plugin-load-script";
import App from './App.vue';
import router from "./router";

Vue.use(LoadScript);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
