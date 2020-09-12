// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Moment from 'moment' //导入日期格式化
//全局加载所有Element-UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import {Button,Radio} from 'element-ui'

// 跨域访问Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import qs from 'qs';
Vue.prototype.qs = qs;
// 绑定 moment 进行时间格式化 ✔
Vue.prototype.$moment = Moment;//日期格式化工具
Vue.config.productionTip = false

//Vue.use(Button)
//Vue.use(Radio)
Vue.use(ElementUI)
Vue.use(VueAxios,axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
