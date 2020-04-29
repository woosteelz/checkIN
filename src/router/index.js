import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/Home'),
    },
    {
      name: 'MainPage',
      path: '/MainPage',
      component: () =>import('@/views/MainPage.vue')
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
    {
      name: 'MyAccount',
      path: '/myaccount',
      component: () => import('@/views/account/MyAccount'),
    },
  ],
})