// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/shared/Alert'
import EditMeetupDialog from './components/Meetup/Edit/MeetupDetailDialog'
import EditDateDialog from './components/Meetup/Edit/DateDialog'
import EditTimeDialog from './components/Meetup/Edit/TimeDialog'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog'
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
  VProgressCircular,
  VDivider,
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
    VProgressCircular,
    VDivider,
    transitions,
    VDialog
  }
})

Vue.config.productionTip = false

// Desclare Global Component
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup', EditMeetupDialog)
Vue.component('app-edit-date', EditDateDialog)
Vue.component('app-edit-time', EditTimeDialog)
Vue.component('app-register', RegisterDialog)

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
      storageBucket: 'gs://vue-devmeetup-25f48.appspot.com'
    })
    // Auto Sign In User
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
