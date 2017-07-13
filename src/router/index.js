import Vue from 'vue'
import Router from 'vue-router'
import basis from '../components/common/basis.vue'
import place from '../components/page/place/place.vue'
import booking from '../components/page/booking/booking.vue'
import approve from '../components/page/approve/approve.vue'
Vue.use(Router);

export default new Router({
    mode : 'history',
    base : __dirname,
    routes : [
        {
            path : '/room', //在IIS发布需要指定项目根目录路由，否则404
            name : 'room',
            component : basis,
            children:[
                {
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    name : 'place',
                    path: 'place',
                    component: place
                },
                {
                    name : 'booking',
                    path: 'booking',
                    component: booking
                },
                {
                    name : 'approve',
                    path: 'approve',
                    component: approve
                }

            ],
            redirect: '/room/place'
        },
        { path: '*', redirect: '/room/place' }


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
