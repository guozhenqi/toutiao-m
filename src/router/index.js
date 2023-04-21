import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
},
{
  path: '/',
  component: () => import('@/views/layout'),
  redirect: '/home',
  children: [
    { 
      path: 'home',
      name: 'home',
      component: () => import('@/views/home')
    },
    {
      path: '/qa',
      name: 'qa',
      component: () => import('@/views/qa')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/views/video')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my')
    },
  ]
},
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search')
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/article'),
      props: true  //开启props传参，吧路由参数映射到组件的props中
    },
    {
      path: '/user/profile',
      name: 'user-profile',
      component: () => import('@/views/user-profile'),
    }
]

const router = new VueRouter({
  routes
})

export default router
