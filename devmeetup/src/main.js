// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/shared/Alert'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  VCard,
  VTextField,
  VDatePicker,
  VTimePicker,
  VAlert,
  transitions,
  VDialog
} from 'vuetify'
import './stylus/main.styl'

Vue.filter('date', DateFilter)
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker,
    VAlert,
    transitions,
    VDialog
  }
})

Vue.config.productionTip = false

// Desclare Global Component
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAMjGYb_OEc0W15QgwG5fR0LqEzHcm_yWQ',
      authDomain: 'vue-devmeetup-25f48.firebaseapp.com',
      databaseURL: 'https://vue-devmeetup-25f48.firebaseio.com',
      projectId: 'vue-devmeetup-25f48',
      storageBucket: ''
    })
  }
})
