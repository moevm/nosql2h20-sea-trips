import Vue from "vue";
import VueRouter from "vue-router";
import Journal from "../components/Journal";
import Statistics from "../components/Statistics";
import Record from "../components/Record";
import NotFound from "../components/NotFound";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Journal },
    { path: '/statistics', component: Statistics },
    { path: '/record/:id', component: Record },
    { path: '*', component: NotFound}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
