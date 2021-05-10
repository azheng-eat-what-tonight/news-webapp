import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

// 加载设置rem基准值
import 'amfe-flexible'

// 加载Vant组件库样式
import './style/index.less'

// 导入自定义全局样式
import 'vant/lib/index.css'

//全局注册Vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')