import { createRouter, createWebHistory} from 'vue-router'

import Leaderboard      from '../views/Leaderboard.vue'
import Signup           from '../views/Signup.vue'
import Login            from '../views/Login.vue'
import ResetPassword    from '../views/ResetPassword.vue'
import Settings         from '../views/Settings.vue'
import E404             from '../views/E404.vue'

const routes = [
    {
        path: '/',
        name: 'Leaderboard',
        component: Leaderboard
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        component: ResetPassword
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/:catchall(.*)',
        name: 'Not Found',
        component: E404
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router