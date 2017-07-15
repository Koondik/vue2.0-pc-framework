/**
 * Created by CZ on 2017/7/15.
 */
import axios from 'axios';
import commonConfig from './config';
import $localStorage from './localStorage';

//数据请求配置
axios.defaults.baseURL = commonConfig.$webroot;
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
const token ='access_token='+ $localStorage.get('cloud').token;
function Request(method,url,data){
    const pattern = /\?/g;
    pattern.test(url)?url+='&':url+='?';
    return axios({
      method : method,
      url : url + token,
      data : data
    });
}
export default Request;