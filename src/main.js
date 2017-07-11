import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './router/index';

Vue.use(ElementUI);

const app = new Vue({
    router: routes,
    render: h => h(App)
}).$mount('#app');
