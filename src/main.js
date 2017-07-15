import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './router/index';
import commonConfig from './config/config';
import $localStorage from './config/localStorage';
Vue.use(ElementUI);
//挂载全局变量
Vue.prototype.GLOBAL_Config = commonConfig;
Vue.prototype.GLOBAL_User = $localStorage.get('cloud'); //用户信息


const app = new Vue({
    router: routes,
    render: h => h(App)
}).$mount('#app');
