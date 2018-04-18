import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    loadedMeetups: [],
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.location) {
        meetup.location = payload.location
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          console.log(meetups)
          commit('setLoading', false)
          commit('setLoadedMeetups', meetups)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.uid
      }
      // variable for image Url and key
      let imageUrl
      let key
      // Reach to firebase and store it
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          // get firebase record key/id
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          // Store Image on firebase storage
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          // get Image Url from firebase storage and referenced on Meetup
          // in firebase database
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key,
            imageUrl: imageUrl
          })
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    updateMeetup ({commit}, payload) {
      commit('setLoading', true)
      const updatedObj = { id: payload.id }
      if (payload.title) {
        updatedObj.title = payload.title
      }
      if (payload.description) {
        updatedObj.description = payload.description
      }
      if (payload.location) {
        updatedObj.location = payload.location
      }
      if (payload.date) {
        updatedObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updatedObj)
        .then((data) => {
          commit('setLoading', false)
          commit('updateMeetup', updatedObj)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        // Load meetups sorted by date
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup (state) {
      // Find specific meetup
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
