import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import Statistics from "./components/Statistics";
import Record from "./components/Record";
import NotFound from "./components/NotFound";
import Journal from "./components/Journal";

Vue.use(VueRouter);

const routes = [
  { path: '', component: Journal },
  { path: '/statistics', component: Statistics },
  { path: '/record/:id', component: Record },
  { path: '*', component: NotFound}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

//Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
