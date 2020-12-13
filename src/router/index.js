import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '主页'
        }
    },
    {
        path: '/portal',
        name: 'Portal',
        component: () => import('../views/portal/Portal.vue'),
        meta: {
            title: '入口'
        }
    },
    // {
    //     path: '/resume',
    //     name: 'Resume',
    //     component: () => import('../views/resume/Resume.vue'),
    //     meta: {
    //         title: '个人介绍'
    //     }
    // },
    {
        path: '/music',
        name: 'Music',
        component: () => import('../views/music/Music.vue'),
        meta: {
            title: '音乐播放器'
        },
        redirect: '/music/discovery',
        children: [
            {
                path: 'search/:keywords?',
                name: 'SearchDetail',
                component: () => import('views/music/childComps/SearchDetail.vue'),
            },
            {
                path: 'discovery',
                name: 'Discovery',
                component: () => import('views/music/childComps/Discovery.vue'),
            },
            {
                path: 'playlists',
                name: 'SuggestPlaylists',
                component: () => import('views/music/childComps/SuggestPlaylists.vue'),
            }, {
                path: 'playlist/:id?',
                name: 'PlaylistDetail',
                component: () => import('views/music/childComps/detail/PlaylistDetail.vue'),
            }
        ]
    },
    {
        path: '/board',
        name: 'Board',
        component: () => import('../views/board/Board.vue'),
        meta: {
            title: '数据可视化'
        }
    }
    //   {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //   }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
router.afterEach(() => {
    NProgress.done()
})

export default router
