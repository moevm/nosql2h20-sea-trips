import Vue from 'vue';
import LoadScript from "vue-plugin-load-script";
import Notifications from 'vue-notification';
import App from './App.vue';
import router from "./router";

Vue.use(LoadScript);
Vue.use(Notifications);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
