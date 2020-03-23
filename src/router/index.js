import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/Home'),
    },
    {
      name: 'Main',
      path: '/MainPage',
      component: () =>import('@/views/Main.vue')
    },
    {
      name: 'SignIn',
      path: '/signin',
      component: () => import('@/views/account/SignIn'),
    },
    {
      name: 'SignUp',
      path: '/signup',
      component: () => import('@/views/account/SignUp'),
    },
    {
      name: 'FindPassword',
      path: '/findpassword',
      component: () => import('@/views/account/FindPassword'),
    },
  ],
})