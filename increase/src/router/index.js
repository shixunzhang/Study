import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mainPage from '@/views/mainPage'
<<<<<<< Updated upstream
import test1 from '@/views/page1/test1'
import test2 from '@/views/page1/test2'
=======
import home from '@/views/home'
>>>>>>> Stashed changes

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage
    },
    {
      path: '/main',
      name: 'mainPage',
      component: mainPage
    },
    {
<<<<<<< Updated upstream
      path: '/test1',
      name: 'test1',
      component: test1
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
=======
      path: '/home',
      name: 'home',
      component: home
>>>>>>> Stashed changes
    }
  ]
})
