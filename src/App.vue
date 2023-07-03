<template>
  <div id="app">
    
    <MainNavbar v-if="user_id !=  null  "/>
    <SecondNavbar v-if="user_id  !=   null  "/>
    <PageHeader v-if="user_id  !=  null  "/>
    <PageBody />
    <!-- <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav> -->

    <!-- <router-view /> -->
  </div>
</template>

<script>

// function detectmob() { 
//  if( navigator.userAgent.match(/Android/i)
//  || navigator.userAgent.match(/webOS/i)
//  || navigator.userAgent.match(/iPhone/i)
//  || navigator.userAgent.match(/iPad/i)
//  || navigator.userAgent.match(/iPod/i)
//  || navigator.userAgent.match(/BlackBerry/i)
//  || navigator.userAgent.match(/Windows Phone/i)
//  ){
//     window.location.href = appUrl
//   }
//  else {
//     return false;
//   }
// }
import './assets/global/js/core/libraries/jquery.min.js'
import './assets/global/js/core/libraries/bootstrap.min.js'
import './assets/global/js/plugins/loaders/blockui.min.js'
import './assets/global/js/plugins/ui/nicescroll.min.js'
import './assets/global/js/plugins/ui/drilldown.js'

import './assets/global/js/plugins/notifications/pnotify.js'
import './assets/global/js/plugins/notifications/sweet_alert.min.js'
import './assets/global/js/plugins/notifications/jgrowl.min.js'
import './assets/global/js/demo_pages/components_collapsible.js'

import './assets/js/app.js'
import { tokenApi, apiUrl, removeToken } from './assets/custom/custom.js'
import axios from 'axios'
import MainNavbar from './components/partials/MainNavbar.vue'
import SecondNavbar from './components/partials/SecondNavbar.vue'
import PageHeader from './components/partials/PageHeader.vue'
import PageBody from './components/partials/PageBody.vue'

export default {
  name: 'app',
  components: {
    MainNavbar,
    SecondNavbar,
    PageHeader,
    PageBody
  },
  data() {
    return {
       user_id: ''
    }
  },
  mounted() {
    this.user_id = tokenApi('token', 'check')
  },
  beforeCreate: async function () {
    if (tokenApi('token', 'check') == null || !this.$session.get('user_id')) {
      try {
				let query = {
					params: {
						user_id: this.$session.get('user_id')
					},
					headers: tokenApi('token', 'header')
        }
				await axios.get(apiUrl('purchaser/receive_po/logout'), query)
				this.$session.destroy()
				removeToken()
			} catch (error) {
        console.log(error)
				alert('error')
      }
      this.user_id = null
      this.$router.push({ name : 'Login'})
    } else {
      let get_current_url = this.$session.get('get_current_url')
      this.$router.push({ name : get_current_url})
    }
  },
 }
</script>


<style >
table, td, th {
    text-align:left  !important;
    font-weight: bolder !important;
    font-size:12px  !important;
    text-transform: uppercase !important;
}
input {
  font-weight: bolder !important;
  font-size:12px  !important;
}

/* @import "https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900"; */
@import "./assets/global/css/icons/icomoon/styles.css";
@import "./assets/css/bootstrap.css";
@import "./assets/css/core.css";
@import "./assets/css/components.css";
@import "./assets/css/colors.css";

</style>

