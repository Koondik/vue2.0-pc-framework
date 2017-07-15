/**
 * Created by CZ on 2017/7/15.
 */
const $localStorage ={
    set:function(key,value){
        try{
            localStorage.setItem(key,JSON.stringify(value));
            return true
        }
        catch (error){
            return false
        }

    },
    get:function(key){
        return JSON.parse(localStorage.getItem(key));
    },
    remove:function(key){
        localStorage.removeItem(key)
    }
};
export default $localStorage