import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'

Vue.use(Router);

export default new Router({
    mode : 'history',
    base : __dirname,
    routes : [
        {
            path : '/',
            name : 'Hello',
            component : Hello
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        // console.log(savedPosition);
        return {x : 0, y : 0};
        // if (savedPosition) {
        //     return savedPosition
        // } else {
        //     return { x: 0, y: 0 }
        // }
    }
})
