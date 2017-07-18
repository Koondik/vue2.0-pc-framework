import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './router/index';
import  formatDate from './config/date';

import commonConfig from './config/config';
import $localStorage from './config/localStorage';
Vue.use(ElementUI);
//挂载全局变量
Vue.prototype.GLOBAL_Config = commonConfig;
Vue.prototype.GLOBAL_User = $localStorage.get('cloud'); //用户信息

//过滤器
//全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
Vue.filter('myDate',function(time){  //时间过滤可使用moment.js
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
});
const app = new Vue({
    router: routes,
    render: h => h(App)
}).$mount('#app');
