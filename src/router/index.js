import Vue from 'vue'
import Router from 'vue-router'

const Link = resolve => require(['@/views/Link'], resolve)
const LinkDetail = resolve => require(['@/views/LinkDetail'], resolve)
const LinkEdit = resolve => require(['@/views/LinkEdit'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Link
    },
    {
        path: '/links/:id',
        component: LinkDetail
    },
    {
        path: '/links/:id/edit',
        component: LinkEdit
    },
    {
        path: '/link/add',
        component: LinkEdit
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
