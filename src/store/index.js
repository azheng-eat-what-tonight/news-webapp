import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "../until/storage.js";

Vue.use(Vuex)

// 这样做的目的可以避免访问和获取数据的名字不一致导致的问题
const USER_KEY = 'HNM_USER'

export default new Vuex.Store({
    state: {
        user: getItem(USER_KEY) // 当前登录用户的状态
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
            //放入本地存储中
            setItem(USER_KEY, state.user);
        }
    },
    actions: {},
    modules: {}
})