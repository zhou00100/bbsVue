import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyApp from '@/components/MyApp'
import UpdateTopic from '@/components/updateTopic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'MyApp',
      component: MyApp
    },
    {
      path: '/updateTopic/:id', //注册路由传参
      name: 'UpdateTopic',
      component: UpdateTopic
    }
  ]
})
