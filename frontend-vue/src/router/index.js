import Home from "@/components/Home";
import Login from "@/components/Login";
import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store"
const NotFound = { template: "<div>Not Found</div>" };

Vue.use(VueRouter);
const beforeAuth = isAuth => (from, to, next) => {
    const isAuthenticated = store.getters["isAuthenticated"]
    if ((isAuthenticated && isAuth) || (!isAuthenticated && !isAuth)) {
        return next()
    } else if (isAuth) {
        next("/login")
    } else {
        next("/")
    }
}

const routes = [
    {path: '/', name: "Home", component: Home, beforeEnter: beforeAuth(true)},
    {path: '/login', name: "Login", component: Login, beforeEnter: beforeAuth(false)},
    {path: '*', component: NotFound}
]

const router = new VueRouter({
    mode: "history",
    routes
})


export default router
