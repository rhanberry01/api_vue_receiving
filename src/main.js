import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadScript from 'vue-plugin-load-script';
import moment from 'moment'
import accounting from 'accounting'
import VuejsPaginate from 'vuejs-paginate'
import VueSession from 'vue-session'

// global.apiUrl = 'http://192.168.0.184:4444/api/'

Vue.config.productionTip = false
Vue.use(LoadScript)
Vue.use(VueSession, { persist: true })

Vue.filter('date',  function (value) {
  return  moment(value).format('MM-DD-YYYY')
})

Vue.filter('toFixed2',  function (value) {
  value = parseFloat(value)
  return  value.toFixed(2)
})

Vue.filter('money', function (value) {
  return  accounting.formatMoney(value, 2)
});

Vue.filter('uppercase', function (value) {
  return  value.toUpperCase()
});

Vue.component('paginate', VuejsPaginate)
new Vue({
  router,
  store,
  VueSession,
  LoadScript,
  render: h => h(App),
}).$mount('#app')
