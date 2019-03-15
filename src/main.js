import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { slider, slideritem } from 'vue-concise-slider'
import VueTouch from 'vue-touch'
import CircleMenu from 'vue-circle-menu'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import ElementUI from 'element-ui'
import Avatar from 'vue-avatar-component'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/font-awesome.min.css'
import '../static/Animate.css'
import Mui from 'vue-awesome-mui'
import axios from 'axios'
import '@/assets/css/iconfont.css'

Vue.use(Mui)
Vue.component('avatar', Avatar)
Vue.component('CircleMenu', CircleMenu)
Vue.component('slider', slider)
Vue.component('slideritem', slideritem)
Vue.component('waterfall', Waterfall)
Vue.component('waterfallSlot', WaterfallSlot)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8081'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
