import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/register/')
    },
    {
        path: '/',
        component: () =>
            import ('../views/layout/'),
        children: [{
            path: '',
            name: 'home', //默认子路由
            component: () =>
                import ('../views/home/'),
        }, {
            path: '/rank',
            name: 'rank',
            component: () =>
                import ('../views/rank/'),
        }, {
            path: '/pla',
            name: 'pla',
            component: () =>
                import ('../views/pla/'),
        }, {
            path: '/my',
            name: 'my',
            component: () =>
                import ('../views/my/'),
        }]
    }, {
        path: '/pla/:plaName',
        name: 'plaItem',
        component: () =>
            import ('@/views/plaItem'),
        props: true
    }

]

const router = new VueRouter({
    //mode: 'history',
    routes
})

export default router